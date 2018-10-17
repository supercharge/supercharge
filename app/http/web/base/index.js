'use strict'

const Routes = require('./routes')

function register (server) {
  server.route(Routes)
  server.log('info', 'Plugin registered: base routes & assets')
}

exports.plugin = {
  name: 'web-base-routes',
  dependencies: ['vision'],
  register
}
