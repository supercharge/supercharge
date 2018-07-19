'use strict'

const Path = require('path')

const middlewarePath = Path.resolve(__appRoot, 'boost', 'middleware')

class Middleware {
  static async load(server) {
    await server.register([
      {
        plugin: require(Path.resolve(middlewarePath, 'authentication'))
      },
      {
        plugin: require(Path.resolve(middlewarePath, 'verify-csrf-token'))
      },
      {
        plugin: require(Path.resolve(middlewarePath, 'add-user-to-view-context'))
      }
    ])
  }
}

module.exports = Middleware
