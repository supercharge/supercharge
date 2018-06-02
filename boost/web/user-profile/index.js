'use strict'

const Path = require('path')
const Routes = require('./routes')
const Authentication = require(Path.resolve(__dirname, '..', 'authentication'))

async function register(server, options) {
  await server.register(Authentication)

  server.route(Routes)
  server.log('info', 'Web Plugin registered: user profile')
}

exports.plugin = {
  name: 'boost-web-user-profile',
  register
}
