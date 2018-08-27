'use strict'

const Joi = require('joi')
const Boom = require('boom')
const Mailer = util('mailer')
const WelcomeMail = mail('welcome')
const { User } = frequire('app', 'models')
const PasswordResetMail = mail('password-reset')

const Handler = {
  showSignup: {
    handler: (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      return h.view('auth/signup')
    }
  },

  signup: {
    handler: async (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      const { email, password } = request.payload

      if (await User.findByEmail(email)) {
        // create an error object that matches the views error handling structure
        const message = 'Email address is already registered'
        throw Boom.conflict(message, { email: message })
      }

      const user = new User({ email, password })
      await user.hashPassword()
      await user.save()

      request.cookieAuth.set({ id: user.id })

      await Mailer.fireAndForget(new WelcomeMail(user))

      return h.view('home', { user })
    },
    ext: {
      onPreResponse: {
        method: async function(request, h) {
          const response = request.response

          if (!response.isBoom) {
            return h.continue
          }

          return h
            .view('auth/signup', {
              email: request.payload.email,
              errors: response.data
            })
            .code(response.output.statusCode)
        }
      }
    },
    validate: {
      payload: {
        email: Joi.string()
          .label('Email address')
          .email({ minDomainAtoms: 2 })
          .trim()
          .required(),
        password: Joi.string()
          .label('Password')
          .min(6)
          .required()
      }
    }
  },

  showLogin: {
    handler: (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      return h.view('auth/login')
    }
  },

  login: {
    handler: async (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      const { email, password } = request.payload
      let user = await User.findByEmail(email)

      if (!user) {
        const message = 'Email address is not registered'
        throw Boom.notFound(message, { email: message })
      }

      await user.comparePassword(password)

      request.cookieAuth.set({ id: user.id })

      return h.redirect('/profile')
    },
    ext: {
      onPreResponse: {
        method: async function(request, h) {
          const response = request.response

          if (!response.isBoom) {
            return h.continue
          }

          return h
            .view('auth/login', {
              email: request.payload.email,
              errors: response.data
            })
            .code(response.output.statusCode)
        }
      }
    },
    validate: {
      payload: {
        email: Joi.string()
          .label('Email address')
          .email({ minDomainAtoms: 2 })
          .trim()
          .required(),
        password: Joi.string()
          .label('Password')
          .min(6)
          .required()
      }
    }
  },

  showForgotPassword: {
    handler: (_, h) => h.view('auth/forgot-password')
  },

  forgotPassword: {
    handler: async (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      const { email } = request.payload
      let user = await User.findByEmail(email)

      if (!user) {
        const message = 'Email address is not registered'
        throw new Boom(message, {
          statusCode: 404,
          data: { email: { message } }
        })
      }

      const passwordResetToken = await user.resetPassword()
      const encodedEmail = encodeURIComponent(user.email)
      const resetURL = `http://${request.headers.host}/reset-password/${encodedEmail}/${passwordResetToken}`

      try {
        await Mailer.send(new PasswordResetMail({ user, resetURL }))
      } catch (err) {
        throw new Boom('We have issues sending the password reset email.')
      }

      return h.view('auth/forgot-password-email-sent')
    },
    ext: {
      onPreResponse: {
        method: async function(request, h) {
          const response = request.response

          if (!response.isBoom) {
            return h.continue
          }

          return h
            .view('auth/forgot-password', {
              email: request.payload.email,
              errors: response.data,
              errormessage: response.data ? null : response.message // this would be be a generic error message, like "Mailer has issues"
            })
            .code(response.output.statusCode)
        }
      }
    },
    validate: {
      payload: {
        email: Joi.string()
          .label('Email address')
          .email({ minDomainAtoms: 2 })
          .trim()
          .required()
      }
    }
  },

  showResetPassword: {
    handler: (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      return h.view('auth/reset-password')
    },
    ext: {
      onPreResponse: {
        method: async function(request, h) {
          const response = request.response

          if (!response.isBoom) {
            return h.continue
          }

          return h.view('auth/reset-password', { errors: response.data }).code(response.output.statusCode)
        }
      }
    },
    validate: {
      params: {
        email: Joi.string()
          .email({ minDomainAtoms: 2 })
          .label('Email address')
          .trim()
          .required(),
        resetToken: Joi.string()
          .label('Password reset token')
          .trim()
          .required()
      }
    }
  },

  resetPassword: {
    handler: async (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      const email = decodeURIComponent(request.params.email)
      let user = await User.findByEmail(email)

      if (!user) {
        const message = 'Sorry, we can’t find a user with the credentials.'
        throw new Boom(message, {
          statusCode: 404,
          data: { email: { message } }
        })
      }

      user = await user.comparePasswordResetToken(request.params.resetToken)
      user.passwordResetToken = undefined
      user.passwordResetDeadline = undefined
      user.password = request.payload.password

      await user.hashPassword()
      await user.save()

      request.cookieAuth.set({ id: user.id })

      return h.view('auth/reset-password-success', { user })
    },
    ext: {
      onPreResponse: {
        method: async function(request, h) {
          const response = request.response

          if (!response.isBoom) {
            return h.continue
          }

          return h.view('auth/reset-password', { errors: response.data }).code(response.output.statusCode)
        }
      }
    },
    validate: {
      params: {
        email: Joi.string()
          .label('Email address')
          .email({ minDomainAtoms: 2 })
          .trim()
          .required(),
        resetToken: Joi.string()
          .label('Password reset token')
          .trim()
          .required()
      },
      payload: {
        password: Joi.string()
          .label('Password')
          .min(6)
          .required(),
        passwordConfirm: Joi.string()
          .label('Confirm password')
          .min(6)
          .valid(Joi.ref('password'))
          .options({
            language: {
              any: { allowOnly: 'must match your new password' }
            }
          })
          .required()
      }
    }
  },

  logout: {
    auth: 'session',
    handler: (request, h) => {
      request.cookieAuth.clear()

      return h.redirect('/')
    }
  }
}

module.exports = Handler
