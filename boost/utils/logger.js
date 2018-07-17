'use strict'

const Config = util('./config')
const Winston = require('winston')
const WinstonFile = require('./logging/file-logger')
const WinstonConsole = require('./logging/console-logger')

class Logger {
  constructor() {
    this.driver = Config.get('logging.driver')
    this.logger = this.logger = Winston.createLogger()

    this.loadDrivers()

    return this.logger
  }

  loadDrivers() {
    if (this.driver === 'console') {
      this.logger.add(new WinstonConsole())
    }

    if (this.driver === 'file') {
      this.logger.add(new WinstonFile())
    }

    if (this.driver === 'stacked') {
      this.logger.add(new WinstonConsole())
      this.logger.add(new WinstonFile())
    }
  }
}

module.exports = new Logger()
