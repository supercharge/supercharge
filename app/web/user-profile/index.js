'use strict'

const Routes = require('./routes')

async function register(server) {
  server.route(Routes)
  server.log('info', 'Web Plugin registered: user profile')
}

exports.plugin = {
  name: 'boost-web-user-profile',
  register
}
