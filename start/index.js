'use strict'

const Hapi = require('hapi')
const Config = util('config')

class Launch {
  async withFullSpeed() {
    const server = this.createHapiServer()

    await this.warmUpCore(server)
    await this.configureViews(server)
    await this.loadMiddleware(server)
    await this.loadAppPlugins(server)

    await this.start(server)
  }

  async start(server) {
    try {
      await server.start()
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }

  createHapiServer() {
    return new Hapi.Server({
      host: 'localhost',
      port: Config.get('app.port')
    })
  }

  async warmUpCore(server) {
    const core = require('./core')
    await server.register(core)
  }

  configureViews(server) {
    const config = require('./views')
    server.views(config.load())
  }

  async loadMiddleware(server) {
    const middleware = require('./middleware')
    await server.register(middleware)
  }

  async loadAppPlugins(server) {
    const plugins = require('./app')
    await server.register(plugins)
  }
}

module.exports = Launch
