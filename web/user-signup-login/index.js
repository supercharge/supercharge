'use strict'

const Routes = require('./routes')

function register(server, options) {
  server.dependency(['vision'])

  server.route(Routes)
  server.log('info', 'Plugin registered: user signup, login, password reset')
}

exports.plugin = {
  name: 'user-signup-login-password-reset',
  version: '1.0.0',
  register
}
