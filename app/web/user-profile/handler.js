'use strict'

const Joi = require('joi')
const Boom = require('boom')
const { User } = frequire('app', 'models')
const ErrorExtractor = util('error-extractor')

const Handler = {
  showProfile: {
    auth: 'session',
    handler: (_, h) => h.view('user/profile')
  },

  updateProfile: {
    auth: 'session',
    handler: async (request, h) => {
      // shortcut
      const { email, name } = request.payload
      let user

      try {
        // check if the username is already chosen
        user = await User.findOne({
          email,
          _id: { $ne: request.user._id }
        })

        if (user) {
          // create an error object that matches our error structure
          const message = 'Email Address is already taken'
          throw new Boom(message, {
            statusCode: 409,
            data: { email: { message } }
          })
        }

        // process the actual user update
        // you can also use "findByIdAndUpdate"
        // "findOneAndUpdate" just gives you more filter options
        user = await User.findOneAndUpdate(
          { _id: request.user._id }, // filters the document
          {
            $set: { email, name }
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
        const user = Object.assign({}, request.user.toObject(), { email, name })

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
        email: Joi.string()
          .label('Email Address')
          .trim(),
        name: Joi.string()
          .label('Name')
          .trim()
          .optional()
          .allow('')
      },
      failAction: (request, h, error) => {
        const errors = ErrorExtractor(error)
        const { email, name } = request.payload
        const user = Object.assign({}, request.user, { email, name })

        return h
          .view('user/profile', {
            user,
            errors
          })
          .code(400)
          .takeover()
      }
    }
  },

  showChangePassword: {
    auth: 'session',
    handler: (_, h) => h.view('user/change-password')
  },

  updateChangePassword: {
    auth: 'session',
    handler: async (request, h) => {
      let user = request.user
      const { password, newPassword } = request.payload

      try {
        await user.comparePassword(password)

        user.password = newPassword
        await request.user.hashPassword()
        await user.save()

        return h.view('user/change-password', {
          successMessage: 'Password changed.'
        })
      } catch (err) {
        const status = err.isBoom ? err.output.statusCode : 400

        return h
          .view('user/change-password', {
            errors: err.data
          })
          .code(status)
      }
    },
    validate: {
      payload: {
        password: Joi.string()
          .min(6)
          .required()
          .label('Current Password'),
        newPassword: Joi.string()
          .min(6)
          .required()
          .label('New Password'),
        newPasswordConfirm: Joi.string()
          .min(6)
          .required()
          .label('New Password Confirm')
          .valid(Joi.ref('newPassword'))
          .options({
            language: {
              any: {
                allowOnly: '!!New Password and Confirm do not match'
              }
            }
          })
      },
      failAction: (_, h, error) => {
        const errors = ErrorExtractor(error)

        return h
          .view('user/change-password', {
            errors
          })
          .code(400)
          .takeover()
      }
    }
  }
}

module.exports = Handler
