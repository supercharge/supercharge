'use strict'

const Config = require('./config')
const MongooseConnection = require('./database/mongoose-connector')

/**
 * The database manager is responsible to manage the database
 * lifecycle for individual connections. On server stop,
 * this manager closes all existing connections.
 */
class DatabaseManager {
  /**
   * Create a new DatabaseManager instance and
   * initialize an empty connections object.
   */
  constructor() {
    this.connections = {}
  }

  /**
   * Connect to a database using a named configuration. The `name`
   * parameter must match a database configuration. If no name
   * is provided, it connects to the default database.
   *
   * @param {String} name
   */
  async connect(name) {
    await this.connection(name).connect()
  }

  /**
   * Close database connections. Use the `name` parameter to
   * specify the named connection to close. You can also pass
   *  an array of named connection to close all at once.
   *
   * @param {String|Array} name
   */
  async close(name) {
    let connections = name || Object.keys(this.connections)
    connections = Array.isArray(connections) ? connections : [connections]

    await Promise.all(
      connections.map(async name => {
        const connection = this.connections[name]

        if (connection) {
          await connection.close()
          delete this.connections[name]
        }
      })
    )
  }

  /**
   * Returns a connection instance specified by `name` or
   * the default connection if the `name` is unavailable.
   * Creates a connection instance if not existent.
   *
   * @param {String} name
   *
   * @returns {Object}
   */
  connection(name = this.defaultConnection()) {
    if (this.connections[name]) {
      return this.connections[name]
    }

    const config = this.configuration(name)

    if (name === 'mongodb') {
      this.connections[name] = new MongooseConnection(config)
    }

    return this.connections[name]
  }

  /**
   * Returns the connection configuration specified
   * by `name`. Throws an error if there is no
   * configuration available for the given `name`.
   *
   * @param {String} name
   *
   * @throws
   */
  configuration(name = this.defaultConnection()) {
    const config = Config.get(`database.${name}`)

    if (!config) {
      throw new Error(`Database ${name} is not configured.`)
    }

    return config
  }

  /**
   * Returns the name of the default database configuration.
   */
  defaultConnection() {
    return Config.get('database.default')
  }
}

module.exports = new DatabaseManager()
