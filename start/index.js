'use strict'

const Hapi = require('hapi')
const Boom = require('boom')
const Config = util('config')
const DatabaseManager = util('database')
const Dispatcher = util('event/dispatcher')

class Launch {
  constructor () {
    this.server = this.createHapiServer()
  }

  /**
   * Returns the current hapi server instance.
   */
  getServer () {
    return this.server
  }
  /**
   * Initialize the hapi server to run
   * your application.
   */
  async launchWithFullSpeed () {
    await this.initialize()
    await this.launch()
  }

  /**
   * Initialize the hapi server instance and
   * register core plugins, middleware, app
   * plugins and configure views.
   */
  async initialize () {
    await this.initializeEvents()
    await this.warmUpCore()
    await this.configureViews()
    await this.loadMiddleware()
    await this.loadAppPlugins()
    await this.connectDatabases()
    await this.server.initialize()
  }

  /**
   * Start the hapi server.
   */
  async launch () {
    try {
      await this.server.start()
    } catch (err) {
      this.server = null

      console.error(err)
      process.exit(1)
    }
  }

  /**
   * Create a new hapi server instance.
   */
  createHapiServer () {
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

  /**
   * The hapi server throws validation errors by default.
   * This makes the detailed error messages available.
   * The reducer composes an object with the errors.
   *
   * @param {Object} _ - request (not used)
   * @param {Object} __ - h (not used)
   * @param {Object} error
   *
   * @throws
   */
  failAction (_, __, error) {
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
   * Register all application events and
   * assign listeners.
   */
  async initializeEvents () {
    await Dispatcher.init()
  }

  /**
   * Register the Boost core dependencies.
   */
  async warmUpCore (options) {
    const loadCore = require('./core')
    const core = await loadCore(options)
    await this.server.register(core)
  }

  /**
   * Configure the Boost view engine.
   */
  configureViews () {
    const config = require('./views')
    this.server.views(config.load())
  }

  /**
   * Register all middleware.
   *
   * @param {Object} options
   */
  async loadMiddleware (options) {
    const loadMiddleware = require('./middleware')
    const middleware = await loadMiddleware(options)
    await this.server.register(middleware)
  }

  /**
   * Register all application plugins.
   */
  async loadAppPlugins () {
    const loadAppPlugins = require('./app')
    const plugins = await loadAppPlugins()
    await this.server.register(plugins)
  }

  /**
   * Connect to the default database that is configured
   * in the `config/database.js` configuration file.
   */
  async connectDatabases () {
    await DatabaseManager.connect()
  }
}

module.exports = Launch
