'use strict'

const Routes = require('./routes')

async function register (server) {
  server.route(Routes)
  server.log('info', 'Plugin registered: user home')
}

exports.plugin = {
  name: 'boost-user-home',
  register
}
