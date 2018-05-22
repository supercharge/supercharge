'use strict'

const Path = require('path')
const _ = require('lodash')
const Logger = require('./logger')
const RequireAll = require('require-all')

/**
 * Manages configuration by recursively reading all
 * `.js` files from the `config` folder.
 */
class Config {
  constructor(configPath) {
    this.configPath = configPath || Path.resolve(__dirname, '..', 'config')
    this.config = {}
    this.syncWithConfigFiles()
  }

  syncWithConfigFiles() {
    this.config = RequireAll({
      dirname: this.configPath,
      filter: /(.*)\.js$/
    })

    Logger.info(`Loaded all config files from ${this.configPath}`)
  }

  /**
   * @example
   * ```
   * Config.get('database.mysql')
   *
   * // referenced
   * {
   *   prodMysql: 'self::database.mysql'
   * }
   * Config.get('database.prodMysql')
   * ```
   */
  get(key, defaultValue) {
    return _.get(this.config, key, defaultValue)
  }

  merge(key, defaultValues, customizer) {
    const value = this.get(key, {})
    return _.mergeWith(defaultValues, value, customizer)
  }
}

module.exports = new Config()
