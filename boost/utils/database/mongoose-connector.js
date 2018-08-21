'use strict'

const Config = util('config')
const Mongoose = require('mongoose')

class MongooseConnector {
  constructor(config) {
    this.config = config

    Mongoose.Promise = global.Promise
    Mongoose.connection.on('error', err => {
      console.error(`⚡️ 🚨 ⚡️ 🚨 ⚡️ 🚨 Mongoose Error → ${err.message}`)
    })
  }

  async connect() {
    await Mongoose.connect(
      this.connectionString(),
      {
        // Mongoose tries to create indexes on startup.
        // While nice for development, it’s recommended
        // to disable it in production since index
        // creation can cause a significant performance impact
        autoIndex: Config.get('app.env') !== 'production',
        ...this.config.options
      }
    )
  }

  async close() {
    await Mongoose.connection.close()
  }

  connectionString() {
    const { host, port, database } = this.config
    return `mongodb://${host}:${port}/${database}`
  }
}

module.exports = MongooseConnector
