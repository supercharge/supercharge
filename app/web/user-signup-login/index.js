'use strict'

const Routes = require('./routes')

function register(server) {
  server.route(Routes)
  server.log('info', 'Web Plugin registered: user signup, login, password reset')
}

exports.plugin = {
  name: 'boost-user-signup-login-password-reset',
  dependencies: ['vision'],
  register
}
