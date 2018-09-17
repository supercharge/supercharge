'use strict'

const Config = util('config')
const Winston = require('winston')
const { combine, timestamp, printf } = Winston.format

/**
 * Configure the Winston file logger with the
 * desired log file and a custom log format
 * that includes the ISO date time.
 */
class WinstonFileLogger {
  constructor () {
    return new Winston.transports.File({
      filename: this.logFile(),
      level: 'debug',
      format: combine(
        timestamp(),
        printf(info => {
          const time = new Date(info.timestamp).getTime()
          return JSON.stringify(Object.assign(info, { time }))
        })
      )
    })
  }

  logFile () {
    return __storagePath('logs', Config.get('logging.logfile'))
  }
}

module.exports = WinstonFileLogger
