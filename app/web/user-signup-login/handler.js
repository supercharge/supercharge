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

      // shortcut
      const payload = request.payload

      try {
        // check whether the email address is already registered
        let user = await User.findByEmail(payload.email)

        if (user) {
          // create an error object that matches our error structure
          const message = 'Email address is already registered'
          throw new Boom(message, {
            statusCode: 409,
            data: { email: { message } }
          })
        }

        // create a new user
        const newUser = new User({
          email: payload.email,
          password: payload.password,
          scope: ['user']
        })

        // don’t store the plain password in your DB, hash it!
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
            email: payload.email,
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
        // prepare formatted error object
        const errors = ErrorExtractor(error)
        // remember the user’s email address and pre-fill for comfort reasons
        const email = request.payload.email

        return h
          .view('auth/signup', {
            email,
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

      // shortcut
      const payload = request.payload

      try {
        let user = await User.findByEmail(payload.email)

        if (!user) {
          const message = 'Email address is not registered'
          throw new Boom(message, {
            statusCode: 404,
            data: { email: { message } }
          })
        }

        await user.comparePassword(payload.password)
        request.cookieAuth.set({ id: user.id })

        return h.redirect('/profile')
      } catch (err) {
        const status = err.isBoom ? err.output.statusCode : 400

        return h
          .view('auth/login', {
            email: payload.email,
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
        // prepare formatted error object
        const errors = ErrorExtractor(error)
        // remember the user’s email address and pre-fill for comfort reasons
        const email = request.payload.email

        return h
          .view('auth/login', {
            email,
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
    handler: (request, h) => {
      return h.view('auth/forgot-password')
    }
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

      // shortcut
      const payload = request.payload

      try {
        let user = await User.findByEmail(payload.email)

        if (!user) {
          const message = 'Email address is not registered'
          throw new Boom(message, {
            statusCode: 404,
            data: { email: { message } }
          })
        }

        const passwordResetToken = await user.resetPassword()

        // encode email address to avoid issues with characters like "@"
        const encodedEmail = encodeURIComponent(user.email)

        // compose the user specific password reset URL
        const resetURL = `http://${request.headers.host}/reset-password/${encodedEmail}/${passwordResetToken}`

        try {
          await Mailer.send('password-reset', user, 'Boost - Password Reset', {
            resetURL
          })
        } catch (err) {
          throw new Boom('We have issues sending the password reset email.')
        }

        return h.view('auth/forgot-password-email-sent')
      } catch (err) {
        const status = err.isBoom ? err.output.statusCode : 400

        // check if thrown error has
        const errormessage = !err.data ? err.message : null

        return h
          .view('auth/forgot-password', {
            email: payload.email,
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
        const email = request.payload.email

        return h
          .view('auth/forgot-password', {
            email,
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

      // shortcut
      const params = request.params
      const email = decodeURIComponent(params.email)

      try {
        let user = await User.findByEmail(email)

        if (!user) {
          const message = 'Sorry, we can’t find a user with the credentials.'
          throw new Boom(message, {
            statusCode: 404,
            data: { email: { message } }
          })
        }

        user = user.comparePasswordResetToken(params.resetToken)

        // remove password reset related data from user
        user.passwordResetToken = undefined
        user.passwordResetDeadline = undefined
        // set new password
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
