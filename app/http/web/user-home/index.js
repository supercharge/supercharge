'use strict'

const Routes = require('./routes')

async function register (server) {
  server.route(Routes)
}

exports.plugin = {
  name: 'user-home',
  register
}
