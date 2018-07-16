'use strict'

const Config = util('config')
const { User } = frequire('app', 'models')

async function register(server, options) {
  await server.register([
    {
      plugin: require('hapi-auth-cookie')
    },
    {
      plugin: require('hapi-request-user')
    }
  ])

  /**
   * Register cookie-based session auth to remember
   * the logged in user
   */
  server.auth.strategy('session', 'cookie', {
    redirectTo: '/login',
    password: Config.get('app.key'),
    isSecure: Config.get('app.env') === 'production',
    appendNext: true,
    validateFunc: async (request, session) => {
      // there is only the user’s id in the session
      const userId = session.id

      if (!userId) {
        return { credentials: null, valid: false }
      }

      const user = await User.findById(userId)

      if (!user) {
        return { credentials: null, valid: false }
      }

      return { credentials: user, valid: true }
    }
  })

  server.auth.default({
    mode: 'try',
    strategy: 'session'
  })
}

exports.plugin = {
  name: 'boost-web-authentication',
  register,
  once: true
}
