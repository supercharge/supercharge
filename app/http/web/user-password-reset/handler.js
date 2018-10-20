'use strict'

const Joi = require('joi')
const User = model('user')
const Boom = require('boom')
const Config = util('config')
const Mailer = util('mailer')
const PasswordResetMail = mail('password-reset')

const Handler = {
  showForgotPassword: {
    handler: (_, h) => h.view('auth/forgot-password', null, { layout: 'clean' })
  },

  forgotPassword: {
    handler: async (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      const { email } = request.payload
      const user = await User.findByEmailOrFail(email)

      const passwordResetToken = await user.resetPassword()
      const encodedEmail = encodeURIComponent(user.email)
      const resetURL = `http://${request.headers.host}/reset-password/${encodedEmail}/${passwordResetToken}`

      try {
        await Mailer.send(new PasswordResetMail({ user, resetURL }))
      } catch (err) {
        throw new Boom('We have issues sending the password reset email.')
      }

      return h.view('auth/forgot-password-email-sent', null, { layout: 'clean' })
    },
    ext: {
      onPreResponse: {
        method: async function (request, h) {
          const response = request.response

          if (!response.isBoom) {
            return h.continue
          }

          return h
            .view(
              'auth/forgot-password',
              {
                email: request.payload.email,
                errors: response.data,
                errormessage: response.message // this would be be a generic error message, like "Mailer has issues"
              },
              { layout: 'clean' }
            )
            .code(response.output.statusCode)
        }
      }
    },
    validate: {
      payload: {
        email: Joi.string().label('Email address').email({ minDomainAtoms: 2 }).trim().required()
      }
    }
  },

  showResetPassword: {
    handler: (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      return h.view('auth/reset-password', null, { layout: 'clean' })
    },
    ext: {
      onPreResponse: {
        method: async function (request, h) {
          const response = request.response

          if (!response.isBoom) {
            return h.continue
          }

          return h
            .view('auth/reset-password', { errors: response.data }, { layout: 'clean' })
            .code(response.output.statusCode)
        }
      }
    },
    validate: {
      params: {
        email: Joi.string().email({ minDomainAtoms: 2 }).label('Email address').trim().required(),
        resetToken: Joi.string().label('Password reset token').trim().required()
      }
    }
  },

  resetPassword: {
    handler: async (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      const email = decodeURIComponent(request.params.email)
      let user = await User.findByEmailOrFail(email)

      user = await user.comparePasswordResetToken(request.params.resetToken)
      user.passwordResetToken = undefined
      user.passwordResetDeadline = undefined
      user.password = request.payload.password

      await user.hashPassword()
      await user.save()

      request.cookieAuth.set({ id: user.id })

      return h.redirect(Config.get('auth.redirects.passwordReset'))
    },
    ext: {
      onPreResponse: {
        method: async function (request, h) {
          const response = request.response

          if (!response.isBoom) {
            return h.continue
          }

          return h
            .view('auth/reset-password', { errors: response.data }, { layout: 'clean' })
            .code(response.output.statusCode)
        }
      }
    },
    validate: {
      params: {
        email: Joi.string().label('Email address').email({ minDomainAtoms: 2 }).trim().required(),
        resetToken: Joi.string().label('Password reset token').trim().required()
      },
      payload: {
        password: Joi.string().label('Password').min(6).required(),
        passwordConfirm: Joi.string().label('Confirm password').min(6)
          .valid(Joi.ref('password'))
          .options({
            language: {
              any: { allowOnly: 'must match your new password' }
            }
          })
          .required()
      }
    }
  }
}

module.exports = Handler
