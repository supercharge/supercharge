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
      const { email, name } = request.payload

      let user = await User.findOne({
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
          new: true // returns the post-update document
        }
      )

      return h.view('user/profile', {
        user,
        successMessage: 'Yehaa! Your profile data looks super fresh!'
      })
    },
    ext: {
      onPreResponse: {
        options: {
          before: ['crumb']
        },
        method: async function(request, h) {
          const response = request.response

          if (!response.isBoom) {
            return h.continue
          }

          const { email, name } = request.payload
          const status = response.output.statusCode || 400

          return h
            .view('user/profile', {
              user: Object.assign({}, request.user.toObject(), { email, name }),
              errors: response.data
            })
            .code(status)
        }
      }
    },
    validate: {
      payload: {
        email: Joi.string()
          .email({ minDomainAtoms: 2 })
          .label('Email Address')
          .trim(),
        name: Joi.string()
          .label('Name')
          .trim()
        // .optional()
        // .allow('')
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
        await user.hashPassword()
        await user.save()

        return h.view('user/change-password', {
          user,
          successMessage: 'Wohoo! Your new password is set and ready to go.'
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
