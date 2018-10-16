'use strict'

const Config = util('./config')
const Winston = require('winston')
const FileLogger = require('./logging/file-logger')
const ConsoleLogger = require('./logging/console-logger')

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
  constructor () {
    this.driver = Config.get('logging.driver')
    this.logger = Winston.createLogger()

    this.loadDrivers()
  }

  /**
   * Load and register the logger transports.
   */
  loadDrivers () {
    if (this.driver === 'console') {
      this.logger.clear().add(new ConsoleLogger().logger())
    }

    if (this.driver === 'file') {
      this.logger.clear().add(new FileLogger().logger())
    }

    if (this.driver === 'stacked') {
      this
        .logger
        .clear()
        .add(new ConsoleLogger().logger())
        .add(new FileLogger().logger())
    }
  }

  /**
   * Log a 'silly' level message.
   *
   * @param {String} message
   * @param  {...Mixed} options
   */
  silly (message, ...options) {
    this.logger.silly(message, ...options)
  }

  /**
   * Log a 'debug' level message.
   *
   * @param {String} message
   * @param  {...Mixed} options
   */
  debug (message, ...options) {
    this.logger.debug(message, ...options)
  }

  /**
   * Log a 'verbose' level message.
   *
   * @param {String} message
   * @param  {...Mixed} options
   */
  verbose (message, ...options) {
    this.logger.verbose(message, ...options)
  }

  /**
   * Log an 'info' level message.
   *
   * @param {String} message
   * @param  {...Mixed} options
   */
  info (message, ...options) {
    this.logger.info(message, ...options)
  }

  /**
   * Log a 'warn' level message.
   *
   * @param {String} message
   * @param  {...Mixed} options
   */
  warn (message, ...options) {
    this.logger.warn(message, ...options)
  }

  /**
   * Log an 'error' level message.
   *
   * @param {String} message
   * @param  {...Mixed} options
   */
  error (message, ...options) {
    this.logger.error(message, ...options)
  }
}

module.exports = new Logger()
