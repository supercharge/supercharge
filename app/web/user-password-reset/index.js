'use strict'

const Routes = require('./routes')

function register (server) {
  server.route(Routes)
  server.log('info', 'Plugin registered: password reset')
}

exports.plugin = {
  name: 'user-password-reset',
  dependencies: ['vision'],
  register
}
