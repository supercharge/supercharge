'use strict'

const Routes = require('./routes')

function register(server, options) {
  server.dependency(['vision'])

  server.route(Routes)
  server.log('info', 'Web Plugin registered: user profile')
}

exports.plugin = {
  name: 'boost-web-user-profile',
  register
}
