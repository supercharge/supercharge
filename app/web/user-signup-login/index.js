'use strict'

const Routes = require('./routes')

function register (server) {
  server.route(Routes)
  server.log('info', 'Plugin registered: user signup, login, password reset')
}

exports.plugin = {
  name: 'user-signup-login',
  dependencies: ['vision'],
  register
}
