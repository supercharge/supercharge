'use strict'

const Path = require('path')

const pluginPath = Path.resolve(__appRoot, 'app', 'web')

class App {
  static async load(server) {
    await server.register([
      {
        plugin: require(Path.resolve(pluginPath, 'base'))
      },
      {
        plugin: require(Path.resolve(pluginPath, 'user-profile'))
      },
      {
        plugin: require(Path.resolve(pluginPath, 'user-signup-login'))
      }
    ])
  }
}

module.exports = App
