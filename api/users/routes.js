'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'POST',
    path: '/login',
    config: Handler.login
  },
  {
    method: 'GET',
    path: '/me',
    config: Handler.me
  },
  {
    method: 'GET',
    path: '/users/{username}',
    config: Handler.show
  }
]

module.exports = Routes
