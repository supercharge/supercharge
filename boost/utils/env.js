'use strict'

const _ = require('lodash')
const Path = require('path')
const Dotenv = require('dotenv')

class Env {
  constructor() {
    this.load(this.getEnvPath(), false)
  }

  load(filePath, overwrite = true) {
    const path = Path.resolve(__appRoot, filePath)

    try {
      // import environment variables from local .env file
      Dotenv.config({ path })
    } catch (err) {
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
