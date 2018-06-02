'use strict'

const Fs = require('fs')
const Path = require('path')
const Pino = require('pino')
const PinoNoir = require('pino-noir')

const logfile = Path.resolve(__dirname, '..', '..', 'storage', 'logs', 'ops_logs.out')

class PinoFileLogger {
  constructor(config) {
    const options = Object.assign(
      {},
      {
        level: 'trace',
        serializerserializers: PinoNoir(['password', 'authToken'])
      },
      config
    )

    const logStream = Fs.createWriteStream(logfile, { flags: 'a' })
    return new Pino(options, logStream)
  }
}

module.exports = PinoFileLogger
