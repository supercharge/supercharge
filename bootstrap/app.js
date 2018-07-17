'use strict'

require('./globals')

const Hapi = require('hapi')
const Path = require('path')
const Config = util('config')
const Laabr = require('laabr')
const Inert = require('inert')
const Vision = require('vision')
const Globby = require('globby')
const Handlebars = require('./views')

// configure hapi response logging format
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

    const middlewarePath = Path.resolve(__appRoot, 'boost', 'middleware')
    const boostMiddlewares = await this.loadHapiPluginsFromFolder(middlewarePath)
    await web.register(boostMiddlewares)

    // register Web plugins created by the user
    const userWebPluginsPath = Path.resolve(__appRoot, 'app', 'web')
    const userWebPlugins = await this.loadHapiPluginsFromFolder(userWebPluginsPath)
    await web.register(userWebPlugins)

    await web.start()
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
    const viewsPath = Path.resolve(__appRoot, 'resources', 'views')

    server.views({
      engines: {
        hbs: Handlebars
      },
      path: [viewsPath, Path.resolve(viewsPath, 'vendor', 'boost')],
      layoutPath: [Path.resolve(viewsPath, 'layouts'), Path.resolve(viewsPath, 'vendor', 'boost', 'layouts')],
      layout: 'default',
      helpersPath: Path.resolve(viewsPath, 'helpers'),
      partialsPath: [Path.resolve(viewsPath, 'partials'), Path.resolve(viewsPath, 'vendor', 'boost', 'partials')],
      isCached: Config.get('app.env') === 'production',
      context: {
        title: Config.get('app.name')
      }
    })
  }

  async fireOff() {
    try {
      await Promise.all([this.launchWeb()])
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
