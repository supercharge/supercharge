'use strict'

const Env = require('@supercharge/framework/env')

module.exports = {
  plugin: require('hapi-dev-errors'),
  options: {
    showErrors: !Env.isProduction(),
    toTerminal: false
  }
}
