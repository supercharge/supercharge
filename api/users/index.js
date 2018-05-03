'use strict'

const Routes = require('./routes')

function register(server, options) {
  server.route(Routes)
  server.log('info', 'Plugin registered: API users')
}

exports.plugin = {
  name: 'api-users',
  version: '1.0.0',
  register
}
