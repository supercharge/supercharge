'use strict'

const Config = util('config')

/**
 * Configure CSRF protection.
 */
async function register(server) {
  await server.register([
    {
      plugin: require('crumb'),
      options: {
        key: Config.get('session.token'),
        cookieOptions: {
          password: Config.get('app.key'),
          isSecure: Config.get('app.env') === 'production'
        }
      }
    }
  ])
}

exports.plugin = {
  name: 'boost-verify-csrf-token',
  once: true,
  register
}
