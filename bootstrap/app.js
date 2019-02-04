'use strict'

const Config = require('@supercharge/framework/config')

/**
 * Tbd.
 */
async function extendApp (server) {
  await server.register([
    {
      plugin: 'hapi-dev-errors',
      options: {
        showErrors: !Config.get('app.isProduction'),
        toTerminal: false
      }
    }
  ])
}

module.exports = extendApp
