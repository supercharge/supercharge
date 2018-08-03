'use strict'

const Config = util('config')
const { User } = frequire('app', 'models')

/**
 * Register authentication plugins and configure the middleware
 * to authenticate requests based on a session cookie. Shortcut
 * the authenticated user to `request.user`.
 */
async function register(server) {
  await server.register([
    {
      plugin: require('hapi-auth-cookie')
    },
    {
      plugin: require('hapi-request-user')
    }
  ])

  server.auth.strategy('session', 'cookie', {
    cookie: Config.get('session.cookie'),
    password: Config.get('app.key'),
    isSecure: Config.get('app.env') === 'production',
    redirectTo: '/login',
    appendNext: true,
    ttl: Config.get('session.lifetime'),
    validateFunc: async (request, session) => {
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
  once: true,
  register
}
