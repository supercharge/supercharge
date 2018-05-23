'use strict'

const Hapi = require('hapi')
const Path = require('path')
const Laabr = require('laabr')
const Inert = require('inert')
const Vision = require('vision')
const Globby = require('globby')
const Handlebars = require('./views')
const Config = require(Path.resolve(__dirname, '..', 'utils', 'config'))

// configure logger
Laabr.format('log', ':time :level :message')

class Bootstrap {
  async launchWeb() {
    // create new web instance
    // add web’s connection information
    const web = new Hapi.Server({
      host: 'localhost',
      port: Config.get('app.port')
    })

    // register plugins to web instance
    await web.register([
      Inert,
      Vision,
      {
        plugin: require('crumb'),
        options: {
          key: 'keepMeSafeFromCsrf',
          cookieOptions: {
            isSecure: Config.get('app.env') === 'production'
          }
        }
      },
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

    this.configureViews(web)

    const webPath = Path.resolve(__dirname, '..', 'boost', 'web')
    const boostWebPluginsPath = await this.loadHapiPluginsFromFolder(webPath)
    await web.register(boostWebPluginsPath)

    // register Web plugins created by the user
    const userWebPluginsPath = Path.resolve(__dirname, '..', 'app', 'web')
    const userWebPlugins = await this.loadHapiPluginsFromFolder(userWebPluginsPath)
    await web.register(userWebPlugins)

    await web.start()
  }

  async launchAPI() {
    const api = new Hapi.Server({
      host: 'localhost',
      port: Config.get('api.port') || 3001,
      routes: {
        validate: {
          failAction(request, h, error) {
            // hapi v17 generates a default error response hiding all validation error details
            // this will always throw the validation error
            // the thrown validation error will be transformed within the `error-interceptor` plugin
            throw error
          }
        }
      }
    })

    // register default API plugins
    await api.register([
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

    // register Boost’s API plugins
    const boostApiPluginsPath = Path.resolve(__dirname, '..', 'boost', 'api')
    const boostApiPlugins = await this.loadHapiPluginsFromFolder(boostApiPluginsPath)
    await api.register(boostApiPlugins)

    // register API plugins created by the user
    const userApiPluginsPath = Path.resolve(__dirname, '..', 'app', 'api')
    const userApiPlugins = await this.loadHapiPluginsFromFolder(userApiPluginsPath)
    await api.register(userApiPlugins)

    await api.start()
  }

  async loadHapiPluginsFromFolder(path) {
    const plugins = await Globby(path, {
      expandDirectories: {
        files: ['index'],
        extensions: ['js'],
        filesOnly: true
      }
    })

    return plugins
      .filter(item => {
        const plugin = require(item)
        return this.isHapiPlugin(plugin)
      })
      .map(item => require(item))
  }

  isHapiPlugin(plugin) {
    return plugin && plugin.plugin
  }

  configureViews(server) {
    // view configuration
    const viewsPath = Path.resolve(__dirname, '..', 'resources', 'views')

    server.views({
      engines: {
        hbs: Handlebars
      },
      path: viewsPath,
      layoutPath: Path.resolve(viewsPath, 'layouts'),
      layout: 'default',
      helpersPath: Path.resolve(viewsPath, 'helpers'),
      partialsPath: Path.resolve(viewsPath, 'partials'),
      isCached: Config.get('app.env') === 'production',
      context: {
        title: Config.get('app.name')
      }
    })
  }

  async fireOff() {
    try {
      await Promise.all([this.launchWeb(), this.launchAPI()])
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
}

process.on('unhandledRejection', error => {
  console.log(error)
  process.exit(1)
})

module.exports = new Bootstrap()
