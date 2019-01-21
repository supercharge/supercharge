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
  constructor (config) {
    if (!config) {
      throw new Error('Mongoose connector config missing. Define the mongoose connection settings in your config/database.js file.')
    }

    this.config = config
    this.createConnectionListeners()
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

  /**
   * Create the MongoDB connection.
   */
  async connect () {
    await Mongoose.connect(this.connectionString(), this.config.options)
  }

  /**
   * Compose the database connection string from
   * the database configuration.
   */
  connectionString () {
    const { host, port, database } = this.config

    return `mongodb://${host}:${port}/${database}`
  }

  /**
   * Close the MongoDB connection.
   */
  async close () {
    await Mongoose.disconnect()
  }

  /**
   * Returns whether Mongoose has connected to
   * the MongoDB database instance.
   */
  async isConnected () {
    return Mongoose.connection.readyState === 1
  }
}

module.exports = MongooseConnector
