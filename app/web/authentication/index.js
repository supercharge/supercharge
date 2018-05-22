'use strict'

const Path = require('path')
const { User } = require(Path.resolve(__dirname, '..', '..', '..', 'models'))
const Env = require(Path.resolve(__dirname, '..', '..', '..', 'utils', 'env'))

async function register(server, options) {
  // declare dependencies to hapi auth plugins
  await server.register([
    {
      plugin: require('hapi-auth-cookie')
    }
  ])

  /**
   * Register cookie-based session auth to remember
   * the logged in user
   */
  server.auth.strategy('session', 'cookie', {
    redirectTo: '/login',
    password: Env.get('APP_KEY'),
    isSecure: Env.get('NODE_ENV') === 'production',
    appendNext: true, // appends the current URL to the query param "next". Set to a string to use a different query param name
    validateFunc: async (request, session) => {
      // validate the existing session
      // we only store the user’s id within the session
      const userId = session.id

      // user lookup and return credentials if available
      // populate watchlist
      const user = await User.findById(userId).populate('watchlist')

      if (user) {
        return { credentials: user, valid: true }
      }

      return { credentials: null, valid: false }
    }
  })

  server.auth.default({
    mode: 'try',
    strategy: 'session'
  })
}

exports.plugin = {
  name: 'web-authentication',
  register
}
