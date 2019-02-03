'use strict'

const Config = require('@supercharge/framework/config')
const AppShutdown = require('./shutdown')

/**
 * This is the list of core plugins for Boost.
 * Add any core plugins if needed.
 */
const corePlugins = [
  { plugin: 'inert' },
  { plugin: 'vision' },
  { plugin: 'hapi-request-user' },
  { plugin: 'hapi-request-utilities' },
  { plugin: 'hapi-response-utilities' },
  {
    plugin: 'hapi-dev-errors',
    options: {
      showErrors: !Config.get('app.isProduction'),
      toTerminal: false
    }
  },
  {
    plugin: 'hapi-pulse',
    options: {
      preServerStop: async () => AppShutdown.preServerStop(),
      postServerStop: async () => AppShutdown.postServerStop(),
      preShutdown: async () => AppShutdown.preShutdown()
    }
  },
  {
    plugin: 'laabr',
    options: {
      formats: { log: 'log.tiny' },
      colored: true,
      hapiPino: { logPayload: false }
    }
  }
]

/**
 * The function to load core plugins allowing
 * to exclude selected plugins. Useful during
 * testing, like excluding the laabr logger.
 *
 * @param {Object} options
 */
async function loadCore ({ exclude } = {}) {
  const excludes = Array.isArray(exclude) ? exclude : [exclude]

  return corePlugins
    .filter(({ plugin }) => {
      return !excludes.includes(plugin)
    })
    .map(({ plugin, options }) => {
      return {
        plugin: require(plugin),
        options
      }
    })
}

module.exports = loadCore
