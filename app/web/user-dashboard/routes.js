'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/home',
    config: Handler.home
  }
]

module.exports = Routes
