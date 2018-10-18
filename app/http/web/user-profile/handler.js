'use strict'

const Joi = require('joi')
const Boom = require('boom')
const { User } = frequire('app', 'models')

const Handler = {
  showProfile: {
    auth: 'session',
    handler: (_, h) => h.view('user/profile')
  },

  updateProfile: {
    auth: 'session',
    handler: async (request, h) => {
      const { email, name = request.user.name } = request.payload

      let user = await User.findOne({
        email,
        _id: { $ne: request.user._id }
      })

      if (user) {
        // create an error object that matches our error structure
        const message = 'Email Address is already taken'
        throw Boom.conflict(message, { email: message })
      }

      user = await User.findOneAndUpdate(
        { _id: request.user._id }, // filters the document
        { $set: { email, name } },
        { new: true } // returns the post-update document
      )

      return h.view('user/profile', {
        user,
        successMessage: 'Yehaa! Your profile data looks super fresh!'
      })
    },
    ext: {
      onPreResponse: {
        method: async function (request, h) {
          const response = request.response

          if (!response.isBoom) {
            return h.continue
          }

          return h
            .view('user/profile', {
              user: Object.assign({}, request.user.toObject(), request.only(['email', 'name'])),
              errors: response.data
            })
            .code(response.output.statusCode)
        }
      }
    },
    validate: {
      payload: {
        email: Joi.string()
          .label('Email Address')
          .email({ minDomainAtoms: 2 })
          .trim()
          .required(),
        name: Joi.string()
          .label('Name')
          .trim()
          .optional()
          .allow('')
      }
    }
  },

  showChangePassword: {
    auth: 'session',
    handler: (_, h) => h.view('user/change-password')
  },

  changePassword: {
    auth: 'session',
    handler: async (request, h) => {
      let user = request.user
      const { password, newPassword } = request.payload

      await user.comparePassword(password)

      user.password = newPassword
      await user.hashPassword()
      await user.save()

      return h.view('user/change-password', {
        user,
        successMessage: 'Wohoo! Your new password is set and ready to go.'
      })
    },
    ext: {
      onPreResponse: {
        method: async function (request, h) {
          const response = request.response

          if (!response.isBoom) {
            return h.continue
          }

          return h.view('user/change-password', { errors: response.data }).code(response.output.statusCode)
        }
      }
    },
    validate: {
      payload: {
        password: Joi.string()
          .label('Current Password')
          .min(6)
          .required(),
        newPassword: Joi.string()
          .label('New Password')
          .min(6)
          .required(),
        newPasswordConfirm: Joi.string()
          .label('New Password Confirm')
          .min(6)
          .valid(Joi.ref('newPassword'))
          .options({
            language: {
              any: {
                allowOnly: '!!New Password and Confirm do not match'
              }
            }
          })
          .required()
      }
    }
  }
}

module.exports = Handler
