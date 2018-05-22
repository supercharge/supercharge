'use strict'

const Fs = require('fs')
const _ = require('lodash')
const Path = require('path')
const Dotenv = require('dotenv')
const Logger = require('./logger')

class Env {
  constructor() {
    this.appRoot = Path.resolve(__dirname, '..')
    this.load(this.getEnvPath(), false)
  }

  load(filePath, overwrite = true) {
    const path = Path.join(this.appRoot, filePath)
    const encoding = 'utf8'

    try {
      // import environment variables from local .env file
      Dotenv.config({ path: Fs.readFileSync(path, encoding) })

      Logger.info('%s environment file from %s', overwrite ? 'Merging' : 'Loading', path)
    } catch (err) {
      Logger.error('Error while loading environment file')
      throw err
    }
  }

  getEnvPath() {
    return '.env'
  }

  get(key, defaultValue = null) {
    return _.get(process.env, key, defaultValue)
  }

  set(key, value) {
    _.set(process.env, key, value)
  }
}

module.exports = new Env()
