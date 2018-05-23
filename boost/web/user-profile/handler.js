'use strict'

const Joi = require('joi')
const Boom = require('boom')
const Path = require('path')
const User = require(Path.resolve(__dirname, '..', '..', '..', 'models')).User
const ErrorExtractor = require(Path.resolve(__dirname, '..', '..', '..', 'utils', 'error-extractor'))

const Handler = {
  profile: {
    auth: 'session',
    handler: (request, h) => {
      return h.view('user/profile')
    }
  },

  update: {
    auth: 'session',
    handler: async (request, h) => {
      // shortcut
      const payload = request.payload
      let user

      try {
        // check if the username is already chosen
        user = await User.findOne({
          username: payload.username,
          _id: { $ne: request.user._id }
        })

        if (user) {
          // create an error object that matches our error structure
          const message = 'Username is already taken'
          throw new Boom(message, {
            statusCode: 409,
            data: { username: { message } }
          })
        }

        // process the actual user update
        // you can also use "findByIdAndUpdate"
        // "findOneAndUpdate" just gives you more filter options
        user = await User.findOneAndUpdate(
          { _id: request.user._id }, // filters the document
          {
            $set: {
              username: payload.username,
              homepage: payload.homepage
            }
          },
          {
            // returns the post-update document
            new: true

            // applies validators defined in the User model.
            // -> this option is off by default due to several caveats
            // -> check this section for more information: http://mongoosejs.com/docs/validation.html#update-validators
            // runValidators: true
          }
        )

        request.user = user
        return h.view('user/profile')
      } catch (err) {
        const status = err.isBoom ? err.output.statusCode : 400
        const user = Object.assign({}, request.user, {
          username: payload.username
        })

        return h
          .view('user/profile', {
            user,
            errors: err.data
          })
          .code(status)
      }
    },
    validate: {
      payload: {
        username: Joi.string()
          .label('Username')
          .trim()
          .optional()
          .allow('')
          .allow(null),
        homepage: Joi.string()
          .label('Homepage')
          .trim()
          .optional()
          .allow('')
          .allow(null)
          .uri()
      },
      failAction: (request, h, error) => {
        // prepare formatted error object
        const errors = ErrorExtractor(error)

        // grab incoming payload values
        const { username, homepage } = request.payload

        // merge existing user data with incoming values
        const user = Object.assign({}, request.user, { username, homepage })

        return h
          .view('user/profile', {
            user,
            errors
          })
          .code(400)
          .takeover()
      }
    }
  }
}

module.exports = Handler
