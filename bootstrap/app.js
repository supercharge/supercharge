'use strict'

const User = require('../app/models/user')
const Config = require('@supercharge/framework/config')

/**
 * Tbd.
 */
async function extendApp (server) {
  // await server.register([
  //   {
  //     plugin: 'hapi-dev-errors',
  //     options: {
  //       showErrors: !Config.get('app.isProduction'),
  //       toTerminal: false
  //     }
  //   }
  // ])

  server.auth.strategy('web', 'cookie', {
    cookie: Config.get('session.cookie'),
    password: Config.get('app.key'),
    isSecure: Config.get('app.isProduction'),
    redirectTo: '/login',
    appendNext: true,
    ttl: Config.get('session.lifetime'),
    validateFunc: async (_, session) => {
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
}

module.exports = extendApp
