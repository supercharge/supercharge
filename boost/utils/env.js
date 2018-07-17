'use strict'

const _ = require('lodash')
const Path = require('path')
const Dotenv = require('dotenv')

class Env {
  constructor() {
    this.load(this.getEnvPath())
  }

  getEnvPath() {
    return '.env'
  }

  load(filePath) {
    const path = Path.resolve(__appRoot, filePath)

    try {
      Dotenv.config({ path })
    } catch (err) {
      throw err
    }
  }

  get(key, defaultValue = null) {
    return _.get(process.env, key, defaultValue)
  }

  set(key, value) {
    _.set(process.env, key, value)
  }
}

module.exports = new Env()
