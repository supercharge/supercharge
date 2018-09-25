'use strict'

const Joi = require('joi')
const User = model('user')
const Event = util('event')
const Boom = require('boom')
const Config = util('config')
const UserRegisteredEvent = event('user-registered')

const Handler = {
  showSignup: {
    handler: (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/profile')
      }

      return h.view('auth/signup', null, { layout: 'clean' })
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

      Event.fire(new UserRegisteredEvent(user))

      return h.redirect(Config.get('auth.redirects.signup'))
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
              'auth/signup',
              {
                email: request.payload.email,
                errors: response.data
              },
              { layout: 'clean' }
            )
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

      return h.view('auth/login', null, { layout: 'clean' })
    }
  },

  login: {
    handler: async (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/home')
      }

      const { email, password } = request.payload
      let user = await User.findByEmail(email)

      if (!user) {
        const message = 'Email address is not registered'
        throw Boom.notFound(message, { email: message })
      }

      await user.comparePassword(password)

      request.cookieAuth.set({ id: user.id })

      return h.redirect(Config.get('auth.redirects.login'))
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
              'auth/login',
              {
                email: request.payload.email,
                errors: response.data
              },
              { layout: 'clean' }
            )
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

  logout: {
    auth: 'session',
    handler: (request, h) => {
      request.cookieAuth.clear()

      return h.redirect('/')
    }
  }
}

module.exports = Handler
