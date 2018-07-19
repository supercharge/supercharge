'use strict'

const Hapi = require('hapi')
const Path = require('path')
const Inert = require('inert')
const Laabr = require('laabr')
const Vision = require('vision')
const Globals = require('./globals')
const Handlebars = require('handlebars')

class RocketLaunch {
  /**
   * Register custom Node.js globals before launching
   * the Boost hapi server. Boost heavily uses
   * globals to access project files.
   */
  constructor({ appRoot }) {
    new Globals().fromAppRoot(appRoot).create()
  }

  async withFullSpeed() {
    const server = this.createHapiServer()

    await this.warmUpCore(server)
    await this.configureViews(server)
    await this.loadMiddleware(server)
    await this.loadAppPlugins(server)

    await this.start(server)
  }

  createHapiServer() {
    const Config = util('config')

    return new Hapi.Server({
      host: 'localhost',
      port: Config.get('app.port')
    })
  }

  async warmUpCore(server) {
    const Config = util('config')

    // configure hapi response logging format
    Laabr.format('log', ':time :level :message')

    await server.register([
      Inert,
      Vision,
      {
        plugin: require('hapi-dev-errors'),
        options: {
          showErrors: Config.get('app.env') !== 'production',
          useYouch: true
        }
      },
      {
        plugin: Laabr.plugin,
        options: {
          colored: true,
          hapiPino: {
            logPayload: false
          }
        }
      }
    ])
  }

  configureViews(server) {
    const Config = util('config')

    server.views({
      engines: {
        hbs: Handlebars
      },
      path: this.viewPaths(),
      layoutPath: this.layoutLocations(),
      layout: 'default',
      helpersPath: this.helpersLocations(),
      partialsPath: this.partialsLocations(),
      isCached: Config.get('app.env') === 'production',
      context: {
        title: Config.get('app.name')
      }
    })
  }

  async loadMiddleware(server) {
    const Middleware = require('./middleware')
    await Middleware.load(server)
  }

  async loadAppPlugins(server) {
    const App = require('./app')
    await App.load(server)
  }

  viewsResourcePath() {
    return __resourcePath('views')
  }

  viewPaths() {
    const views = this.viewsResourcePath()

    // eslint-disable-next-line
    return [
      views,
      Path.resolve(views, 'vendor', 'boost')
    ]
  }

  layoutLocations() {
    const views = this.viewsResourcePath()

    // eslint-disable-next-line
    return [
      Path.resolve(views, 'layouts'),
      Path.resolve(views, 'vendor', 'boost', 'layouts')
    ]
  }

  helpersLocations() {
    const views = this.viewsResourcePath()

    // eslint-disable-next-line
    return [
      Path.resolve(views, 'helpers'),
      Path.resolve(views, 'vendor', 'boost', 'helpers')
    ]
  }

  partialsLocations() {
    const views = this.viewsResourcePath()

    // eslint-disable-next-line
    return [
      Path.resolve(views, 'partials'),
      Path.resolve(views, 'vendor', 'boost', 'partials')
    ]
  }

  async start(server) {
    try {
      await server.start()
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
}

module.exports = RocketLaunch
