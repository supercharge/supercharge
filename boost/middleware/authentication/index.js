'use strict'

const Config = util('config')
const { User } = frequire('app', 'models')

async function register(server) {
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
    cookie: Config.get('session.cookie'),
    password: Config.get('app.key'),
    isSecure: Config.get('app.env') === 'production',
    redirectTo: '/login',
    appendNext: true,
    ttl: Config.get('session.lifetime'),
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
  name: 'boost-authentication',
  register,
  once: true
}
