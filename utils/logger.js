'use strict'

const ConsoleLogger = require('./logging/console-logger')

class Logger {
  constructor(options) {
    this.driver = new ConsoleLogger(options)

    return this.driver
  }
}

module.exports = new Logger()
