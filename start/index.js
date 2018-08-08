'use strict'

const Hapi = require('hapi')
const Config = util('config')

class Launch {
  /**
   * Initialize the hapi server to run
   * your application.
   */
  async launchWithFullSpeed() {
    const server = this.createHapiServer()

    await this.warmUpCore(server)
    await this.configureViews(server)
    await this.loadMiddleware(server)
    await this.loadAppPlugins(server)

    await this.start(server)
  }

  /**
   * Start the hapi server.
   *
   * @param {Object} server
   */
  async start(server) {
    try {
      await server.start()
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }

  /**
   * Create a new hapi server instance.
   */
  createHapiServer() {
    return new Hapi.Server({
      host: 'localhost',
      port: Config.get('app.port')
    })
  }

  /**
   * Register the Boost core dependencies.
   *
   * @param {Object} server
   */
  async warmUpCore(server) {
    const core = require('./core')
    await server.register(core)
  }

  /**
   * Configure the Boost view engine.
   *
   * @param {Object} server
   */
  configureViews(server) {
    const config = require('./views')
    server.views(config.load())
  }

  /**
   * Register all middleware.
   *
   * @param {Object} server
   */
  async loadMiddleware(server) {
    const middleware = require('./middleware')
    await server.register(middleware)
  }

  /**
   * Register all application plugins.
   *
   * @param {Object} server
   */
  async loadAppPlugins(server) {
    const plugins = require('./app')
    await server.register(plugins)
  }
}

module.exports = Launch
