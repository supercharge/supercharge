'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/profile',
    config: Handler.showProfile
  },
  {
    method: 'POST',
    path: '/profile',
    config: Handler.updateProfile
  },
  {
    method: 'GET',
    path: '/change-password',
    config: Handler.showChangePassword
  },
  {
    method: 'POST',
    path: '/change-password',
    config: Handler.updateChangePassword
  }
]

module.exports = Routes
