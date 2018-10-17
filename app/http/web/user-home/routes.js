'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/home',
    options: Handler.home
  }
]

module.exports = Routes
