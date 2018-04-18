'use strict'

const Boom = require('boom')
const { User } = require('../../models')

async function register (server, options) {
  // declare dependencies to hapi auth plugins
  await server.register([
    {
      plugin: require('hapi-auth-basic')
    },
    {
      plugin: require('hapi-auth-jwt2')
    }
  ])

  /**
   * Basic authentication strategy for username and password
   */
  server.auth.strategy('basic', 'basic', {
    validate: async (request, email, password) => {
      const user = await User.findByEmail(email)

      if (!user) {
        throw Boom.notFound('There is no user with the given email address')
      }

      await user.comparePassword(password)

      return { credentials: user, isValid: true }
    }
  })

  /**
   * JWT strategy (for API requests)
   */
  if (!process.env.JWT_SECRET_KEY) {
    throw new Boom('Missing JWT_SECRET_KEY environment variable. Add it to your ENV vars')
  }

  server.auth.strategy('jwt', 'jwt', {
    key: [ process.env.JWT_SECRET_KEY ],
    tokenType: 'Bearer',
    verifyOptions: {
      algorithms: ['HS256']
    },
    validate: (jwtPayload, request, h) => {
      // the JWT payload contains the user object
      // no further database lookup required
      const user = jwtPayload.user

      if (user) {
        return { isValid: true, credentials: user }
      }

      return { isValid: false }
    },
    errorFunc: ({ message }) => {
      throw Boom.unauthorized(message || 'Invalid or expired JWT')
    }
  })

  server.auth.default('jwt')
}

exports.plugin = {
  name: 'authentication',
  version: '1.0.0',
  register
}
