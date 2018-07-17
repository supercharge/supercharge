'use strict'

const _ = require('lodash')
const Path = require('path')
const RequireAll = require('require-all')

/**
 * Manages configuration by recursively reading all
 * `.js` files from the `config` folder.
 */
class Config {
  constructor(configPath) {
    this.configPath = configPath || Path.resolve(__appRoot, 'config')
    this.config = {}

    this.syncConfigFiles()
  }

  /**
   * Imports the app configuration files
   * from the "config" folder.
   */
  syncConfigFiles() {
    this.config = RequireAll({
      dirname: this.configPath,
      filter: /(.*)\.js$/
    })
  }

  /**
   * Returns the requested config value
   *
   * @example
   * ```
   * Config.get('database.mysql')
   * ```
   */
  get(key, defaultValue) {
    return _.get(this.config, key, defaultValue)
  }
}

module.exports = new Config()
