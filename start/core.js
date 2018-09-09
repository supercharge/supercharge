'use strict'

const Config = util('config')
const Laabr = require('laabr')
const DatabaseManager = util('database')

// configure hapi response logging format
Laabr.format('log', ':time :level :message')

/**
 * This is the list of core plugins for Boost.
 * Add any core plugins if needed.
 */
const core = [
  {
    plugin: require('inert')
  },
  {
    plugin: require('vision')
  },
  {
    plugin: require('hapi-request-utilities')
  },
  {
    plugin: require('hapi-response-utilities')
  },
  {
    plugin: require('hapi-dev-errors'),
    options: {
      showErrors: Config.get('app.env') !== 'production',
      toTerminal: false
    }
  },
  {
    plugin: require('hapi-pulse'),
    options: {
      onSignal: async function () {
        await DatabaseManager.close()
      }
    }
  },
  {
    plugin: Laabr.plugin,
    options: {
      colored: true,
      hapiPino: {
        logPayload: false
      }
    }
  }
]

module.exports = core
