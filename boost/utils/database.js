'use strict'

const Config = require('./config')
const MongooseConnection = require('./database/mongoose-connector')

class DatabaseManager {
  constructor() {
    this.connections = {}
  }

  async connect() {
    await this.connection().connect()
  }

  async close() {
    const connections = Object.keys(this.connections)

    await Promise.all(
      connections.map(async name => {
        await this.connections[name].close()
        delete this.connections[name]
      })
    )
  }

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

  configuration(name = this.defaultConnection()) {
    const config = Config.get(`database.${name}`)

    if (!config) {
      throw new Error(`Database ${name} is not configured.`)
    }

    return config
  }

  defaultConnection() {
    return Config.get('database.default')
  }
}

module.exports = new DatabaseManager()
