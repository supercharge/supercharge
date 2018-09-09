'use strict'

const Path = require('path')
const Fs = util('filesystem')
const middlewarePath = Path.resolve(__appRoot, 'boost', 'middleware')

/**
 * All Boost middlewares that apply to all
 * or a group of requests.
 */
async function loadMiddleware ({ exclude } = {}) {
  const middleware = await Fs.readDir(middlewarePath)
  const excludes = Array.isArray(exclude) ? exclude : [exclude]

  return middleware
    .filter(middleware => {
      return !excludes.includes(middleware)
    })
    .map(middleware => {
      return {
        plugin: require(Path.resolve(middlewarePath, middleware))
      }
    })
}

module.exports = loadMiddleware
