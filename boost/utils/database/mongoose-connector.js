'use strict'

const Logger = util('logger')
const Mongoose = require('mongoose')

/**
 * This Mongoose connector manages the database
 * lifecycle for connecting and closing the
 *  connection.
 */
class MongooseConnector {
  /**
   * Create a MongooseConnector instance. Configure
   * the Mongoose promise library and register
   * a listener for database errors.
   *
   * @param {Object} config
   */
  constructor (connectionConfig) {
    if (!connectionConfig) {
      throw new Error('Mongoose connector config missing. Define the mongoose connection settings in your config/database.js file.')
    }

    this.connectionConfig = connectionConfig
    this.createConnectionListeners()
  }

  /**
   * Create the MongoDB connection.
   */
  async connect () {
    await Mongoose.connect(this.connectionString(), this.connectionConfig.options)
  }

  /**
   * Returns whether Mongoose has connected to
   * the MongoDB database instance.
   */
  async isConnected () {
    return Mongoose.connection.readyState === 1
  }

  /**
   * Close the MongoDB connection.
   */
  async close () {
    await Mongoose.disconnect()
  }

  /**
   * Compose the database connection string from
   * the database configuration.
   */
  connectionString () {
    const { host, port, database } = this.connectionConfig
    return `mongodb://${host}:${port}/${database}`
  }

  /**
   * Create listeners for connection events.
   */
  createConnectionListeners () {
    Mongoose.connection.on('error', this.onConnectionError)
  }

  /**
   * Handle connection errors.
   *
   * @param {Object} err
   */
  onConnectionError (err) {
    Logger.error(`⚡️ 🚨 Mongoose Error → ${err.message}`)
  }
}

module.exports = MongooseConnector
