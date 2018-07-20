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
    const Core = require('./core')
    await Core.warmUp(server)
  }

  configureViews(server) {
    const Views = require('./views')
    Views.configure(server)
  }

  async loadMiddleware(server) {
    const Middleware = require('./middleware')
    await Middleware.load(server)
  }

  async loadAppPlugins(server) {
    const App = require('./app')
    await App.load(server)
  }
}

module.exports = Launch
