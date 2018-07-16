'use strict'

const Config = util('./config')
const Winston = require('winston')
const WinstonFile = require('./logging/file-logger')
const WinstonConsole = require('./logging/console-logger')

class Logger {
  constructor() {
    this.logger = Winston.createLogger({
      transports: [new WinstonConsole()]
    })

    const driver = Config.get('logging.driver')

    if (driver === 'stacked') {
      this.logger.add(new WinstonFile())
    }

    return this.logger
  }
}

module.exports = new Logger()
