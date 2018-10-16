'use strict'

const Config = util('config')
const AppShutdown = require('./shutdown')

/**
 * This is the list of core plugins for Boost.
 * Add any core plugins if needed.
 */
const corePlugins = [
  { plugin: 'inert' },
  { plugin: 'vision' },
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
      onSignal: AppShutdown.postServerStop
    }
  },
  {
    plugin: 'laabr',
    options: {
      formats: {
        'log': ':time :level :message'
      },
      colored: true,
      hapiPino: {
        logPayload: false
      }
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
