'use strict'

const Hapi = require('hapi')
const Boom = require('boom')
const Config = util('config')
const DatabaseManager = util('database')

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
    await this.connectDatabases()
    await this.launch(server)
  }

  /**
   * Start the hapi server.
   *
   * @param {Object} server
   */
  async launch(server) {
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
      port: Config.get('app.port'),
      routes: {
        validate: {
          options: {
            stripUnknown: true,
            abortEarly: false
          },
          failAction: this.failAction
        }
      }
    })
  }

  failAction(_, __, error) {
    const errors = error.details.reduce((collector, { path, message }) => {
      const field = path[path.length - 1]

      return {
        ...collector,
        [field]: message.replace(/"/g, '')
      }
    }, {})

    throw Boom.badRequest(error.message, errors)
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

  /**
   * Connect to the default database that is configured
   * in the `config/database.js` configuration file.
   */
  async connectDatabases() {
    await DatabaseManager.connect()
  }
}

module.exports = Launch
