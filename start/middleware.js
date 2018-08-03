'use strict'

const Path = require('path')

const middlewarePath = Path.resolve(__appRoot, 'boost', 'middleware')

/**
 * All Boost middlewares that apply to all
 * or a group of requests.
 */
const middleware = [
  {
    plugin: require(Path.resolve(middlewarePath, 'authentication'))
  },
  {
    plugin: require(Path.resolve(middlewarePath, 'verify-csrf-token'))
  }
]

module.exports = middleware
