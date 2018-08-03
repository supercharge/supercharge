'use strict'

const Config = util('./config')
const Winston = require('winston')
const WinstonFile = require('./logging/file-logger')
const WinstonConsole = require('./logging/console-logger')

/**
 * The application logger based on Winston to
 * send messages to different locations,
 * like terminal, file or both.
 */
class Logger {
  /**
   * Initialize the Winston logger instance
   * and configure the desired transports
   * based on the application config.
   */
  constructor() {
    this.driver = Config.get('logging.driver')
    this.logger = this.logger = Winston.createLogger()

    this.loadDrivers()

    return this.logger
  }

  /**
   * Load and register the logger transports.
   */
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
