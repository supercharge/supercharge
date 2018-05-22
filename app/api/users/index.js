'use strict'

const Routes = require('./routes')

function register(server, options) {
  server.route(Routes)
  server.log('info', 'API Plugin registered: users')
}

exports.plugin = {
  name: 'api-users',
  version: '1.0.0',
  register
}
