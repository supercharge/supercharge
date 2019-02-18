'use strict'

const Config = require('@supercharge/framework/config')

module.exports = {
  plugin: require('hapi-dev-errors'),
  options: {
    showErrors: !Config.get('app.isProduction'),
    toTerminal: false
  }
}
