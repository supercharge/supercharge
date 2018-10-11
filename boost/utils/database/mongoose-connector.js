'use strict'

const Config = util('config')
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

    // to avoid "ensureIndex" deprecation warning
    Mongoose.set('useCreateIndex', true)

    Mongoose.Promise = global.Promise
    Mongoose.connection.on('error', err => {
      console.error(`⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨 Mongoose Error → ${err.message}`)
    })
  }

  /**
   * Create the MongoDB connection.
   */
  async connect () {
    await Mongoose.connect(
      this.connectionString(),
      {
        /**
         * Mongoose tries to create indexes on startup.
         * While nice for development, it’s recommended
         * to disable it in production since index
         * creation can cause a significant performance impact
         */
        autoIndex: Config.get('app.env') !== 'production',
        ...this.config.options
      }
    )
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
    const { host, port, database } = this.config
    return `mongodb://${host}:${port}/${database}`
  }
}

module.exports = MongooseConnector
