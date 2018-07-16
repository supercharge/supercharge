'use strict'

const Path = require('path')
const Config = util('config')
const Winston = require('winston')
const { combine, timestamp, printf } = Winston.format

const logFileName = Config.get('logging.logfile')
const logfile = Path.resolve(__appRoot, 'storage', 'logs', logFileName)

class WinstonFileLogger {
  constructor() {
    console.log('adding file logger')

    return new Winston.transports.File({
      filename: logfile,
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
}

module.exports = WinstonFileLogger
