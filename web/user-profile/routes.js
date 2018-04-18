'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/profile',
    config: Handler.profile
  },
  {
    method: 'POST',
    path: '/profile',
    config: Handler.update
  }
]

module.exports = Routes
