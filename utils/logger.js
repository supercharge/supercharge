'use strict'

const Config = require('./config')
const FileLogger = require('./logging/file-logger')
const ConsoleLogger = require('./logging/console-logger')

class Logger {
  constructor(options) {
    const driver = Config.get('logging.driver')
    this.drivers = []

    if (driver === 'stacked') {
      this.drivers = [new ConsoleLogger(options), new FileLogger(options)]
    }

    if (driver === 'console') {
      this.drivers = [new ConsoleLogger(options)]
    }

    if (driver === 'file') {
      this.drivers = [new FileLogger(options)]
    }
  }

  trace(msg) {
    this.drivers.forEach(driver => driver.trace(msg))
  }

  debug(msg) {
    this.drivers.forEach(driver => driver.debug(msg))
  }

  info(msg) {
    this.drivers.forEach(driver => driver.info(msg))
  }

  warn(msg) {
    this.drivers.forEach(driver => driver.warn(msg))
  }

  error(msg) {
    this.drivers.forEach(driver => driver.error(msg))
  }

  fatal(msg) {
    this.drivers.forEach(driver => driver.fatal(msg))
  }

  critical(msg) {
    this.fatal(msg)
  }
}

module.exports = new Logger()
