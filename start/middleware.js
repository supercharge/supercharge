'use strict'

const Path = require('path')

const middlewarePath = Path.resolve(__appRoot, 'boost', 'middleware')

const middleware = [
  {
    plugin: require(Path.resolve(middlewarePath, 'authentication'))
  },
  {
    plugin: require(Path.resolve(middlewarePath, 'verify-csrf-token'))
  }
]

module.exports = middleware
