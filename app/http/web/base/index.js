'use strict'

const Routes = require('./routes')

function register (server) {
  server.route(Routes)
}

exports.plugin = {
  name: 'web-base-routes',
  dependencies: ['vision'],
  register
}
