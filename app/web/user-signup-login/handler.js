'use strict'

const Joi = require('joi')
const Boom = require('boom')
const Mailer = util('mailer')
const { User } = frequire('app', 'models')
const ErrorExtractor = util('error-extractor')

const Handler = {
  showSignup: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      return h.view('auth/signup')
    }
  },

  signup: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: async (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      const { email, password } = request.payload

      try {
        let user = await User.findByEmail(email)

        if (user) {
          // create an error object that matches the views error handling structure
          const message = 'Email address is already registered'
          throw new Boom(message, {
            statusCode: 409,
            data: { email: { message } }
          })
        }

        const newUser = new User({
          email,
          password
        })

        user = await newUser.hashPassword()
        user = await user.save()

        request.cookieAuth.set({ id: user.id })

        const discoverURL = `http://${request.headers.host}/discover`
        Mailer.fireAndForget('welcome', user, 'Boost — Great to see you!', {
          discoverURL
        })

        // \o/ wohoo, sign up successful
        return h.view('home')
      } catch (err) {
        const status = err.isBoom ? err.output.statusCode : 400

        return h
          .view('auth/signup', {
            email,
            errors: err.data
          })
          .code(status)
      }
    },
    validate: {
      options: {
        stripUnknown: true,
        abortEarly: false
      },
      payload: {
        email: Joi.string()
          .email({ minDomainAtoms: 2 })
          .required()
          .label('Email address'),
        password: Joi.string()
          .min(6)
          .required()
          .label('Password')
      },
      failAction: (request, h, error) => {
        const errors = ErrorExtractor(error)

        return h
          .view('auth/signup', {
            email: request.payload.email,
            errors
          })
          .code(400)
          .takeover()
      }
    }
  },

  showLogin: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      return h.view('auth/login')
    }
  },

  login: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: async (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      const { email, password } = request.payload

      try {
        let user = await User.findByEmail(email)

        if (!user) {
          const message = 'Email address is not registered'
          throw new Boom(message, {
            statusCode: 404,
            data: { email: { message } }
          })
        }

        await user.comparePassword(password)
        request.cookieAuth.set({ id: user.id })

        return h.redirect('/profile')
      } catch (err) {
        const status = err.isBoom ? err.output.statusCode : 400

        return h
          .view('auth/login', {
            email,
            errors: err.data
          })
          .code(status)
      }
    },
    validate: {
      options: {
        stripUnknown: true,
        abortEarly: false
      },
      payload: {
        email: Joi.string()
          .email({ minDomainAtoms: 2 })
          .required()
          .label('Email address'),
        password: Joi.string()
          .min(6)
          .required()
          .label('Password')
      },
      failAction: async (request, h, error) => {
        const errors = ErrorExtractor(error)

        return h
          .view('auth/login', {
            email: request.payload.email,
            errors
          })
          .code(400)
          .takeover()
      }
    }
  },

  showForgotPassword: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: (_, h) => h.view('auth/forgot-password')
  },

  forgotPassword: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: async (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      const { email } = request.payload

      try {
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

        try {
          await Mailer.send('password-reset', user, 'Boost - Password Reset', {
            resetURL: `http://${request.headers.host}/reset-password/${encodedEmail}/${passwordResetToken}`
          })
        } catch (err) {
          throw new Boom('We have issues sending the password reset email.')
        }

        return h.view('auth/forgot-password-email-sent')
      } catch (err) {
        const status = err.isBoom ? err.output.statusCode : 400
        const errormessage = err.data ? null : err.message

        return h
          .view('auth/forgot-password', {
            email,
            errors: err.data,
            errormessage
          })
          .code(status)
      }
    },
    validate: {
      options: {
        stripUnknown: true,
        abortEarly: false
      },
      payload: {
        email: Joi.string()
          .email({ minDomainAtoms: 2 })
          .required()
          .label('Email address')
      },
      failAction: (request, h, error) => {
        const errors = ErrorExtractor(error)

        return h
          .view('auth/forgot-password', {
            email: request.payload.email,
            errors
          })
          .code(400)
          .takeover()
      }
    }
  },

  showResetPassword: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      return h.view('auth/reset-password')
    },
    validate: {
      params: {
        email: Joi.string()
          .email({ minDomainAtoms: 2 })
          .required()
          .trim()
          .label('Email address'),
        resetToken: Joi.string()
          .required()
          .trim()
          .label('Password reset token')
      },
      failAction: (request, h, error) => {
        const errors = ErrorExtractor(error)

        return h
          .view('auth/reset-password', {
            errors
          })
          .code(400)
          .takeover()
      }
    }
  },

  resetPassword: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: async (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      const { resetToken } = request.params
      const email = decodeURIComponent(request.params.email)

      try {
        let user = await User.findByEmail(email)

        if (!user) {
          const message = 'Sorry, we can’t find a user with the credentials.'
          throw new Boom(message, {
            statusCode: 404,
            data: { email: { message } }
          })
        }

        user = user.comparePasswordResetToken(resetToken)

        user.passwordResetToken = undefined
        user.passwordResetDeadline = undefined
        user.password = request.payload.password

        await user.hashPassword()
        await user.save()

        request.cookieAuth.set({ id: user.id })

        return h.view('auth/reset-password-success')
      } catch (err) {
        const status = err.isBoom ? err.output.statusCode : 400

        return h.view('auth/reset-password', { errors: err.data }).code(status)
      }
    },
    validate: {
      options: {
        stripUnknown: true,
        abortEarly: false
      },
      params: {
        email: Joi.string()
          .email({ minDomainAtoms: 2 })
          .required()
          .trim()
          .label('Email address'),
        resetToken: Joi.string()
          .required()
          .trim()
          .label('Password reset token')
      },
      payload: {
        password: Joi.string()
          .min(6)
          .required()
          .label('Password'),
        passwordConfirm: Joi.string()
          .min(6)
          .valid(Joi.ref('password'))
          .required()
          .options({
            language: {
              any: { allowOnly: 'must match password' }
            }
          })
          .label('Confirm password')
      },
      failAction: (request, h, error) => {
        const errors = ErrorExtractor(error)

        return h
          .view('auth/reset-password', { errors })
          .code(400)
          .takeover()
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
