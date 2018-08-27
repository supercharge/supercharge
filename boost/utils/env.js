'use strict'

const _ = require('lodash')
const Path = require('path')
const Dotenv = require('dotenv')
const DotenvExpand = require('dotenv-expand')

/**
 * Manage the application's environment variables.
 * It reads the `.env` file located in the
 * project's root directory.
 */
class Env {
  /**
   * Initialize the applications environment by
   * reading the .env file.
   */
  constructor() {
    this.load(this.getEnvPath())
  }

  /**
   * Returns the `.env` file path and name in
   * the project's root directory.
   */
  getEnvPath() {
    return '.env'
  }

  /**
   * Load the `.env` file to resolve all
   * environment variables.
   *
   * @param {String} filename
   */
  load(filename) {
    const path = Path.resolve(__appRoot, filename)

    try {
      const config = Dotenv.config({ path })
      DotenvExpand(config)
    } catch (err) {
      throw err
    }
  }

  /**
   * Returns the value of the request
   * environment variable.
   *
   * @param {String} key
   * @param {String} defaultValue
   */
  get(key, defaultValue = null) {
    return _.get(process.env, key, defaultValue)
  }

  /**
   * Set the value of an environment variable.
   *
   * @param {String} key
   * @param {String} value
   */
  set(key, value) {
    _.set(process.env, key, value)
  }
}

module.exports = new Env()
