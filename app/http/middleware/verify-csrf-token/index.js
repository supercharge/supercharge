'use strict'

const Config = require('@supercharge/framework/config')

/**
 * Configure CSRF protection based on the `crumb` hapi plugin.
 * Register `crumb` as the last plugin in the server to
 * make sure the CSRF token is added to every view.
 */
async function register (server) {
  server.ext('onPreStart', async () => {
    await server.register([
      {
        plugin: require('crumb'),
        options: {
          key: Config.get('session.token'),
          cookieOptions: {
            password: Config.get('app.key'),
            isSecure: Config.get('app.isProduction')
          }
        }
      }
    ])
  })
}

exports.plugin = {
  name: 'boost-verify-csrf-token',
  once: true,
  register
}
