'use strict'

const _ = require('lodash')
const Path = require('path')
const RequireAll = require('require-all')

/**
 * This is the central application configuration.
 * Manage the configuration by reading all
 * `.js` files from the `config` folder.
 */
class Config {
  /**
   * Initialize the application configuration
   * by setting the configuration path and
   * reading all config files.
   */
  constructor () {
    this.config = {}
    this.configPath = Path.resolve(__appRoot, 'config')
    this.loadConfigFiles()
  }

  /**
   * Import all application configurations.
   */
  loadConfigFiles () {
    this.config = RequireAll({
      dirname: this.configPath,
      filter: /(.*)\.js$/
    })
  }

  /**
   * Returns the requested config value.
   *
   * @param {String} key
   * @param {Mixed} defaultValue
   *
   * @returns {Mixed}
   */
  get (key, defaultValue) {
    return _.get(this.config, key, defaultValue)
  }

  /**
   * Set a config value.
   *
   * @param {String} key
   * @param {Mixed} value
   *
   * @returns {Mixed}
   */
  set (key, value) {
    return _.set(this.config, key, value)
  }
}

module.exports = new Config()
