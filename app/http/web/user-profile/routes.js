'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/profile',
    options: Handler.showProfile
  },
  {
    method: 'POST',
    path: '/profile',
    options: Handler.updateProfile
  },
  {
    method: 'GET',
    path: '/change-password',
    options: Handler.showChangePassword
  },
  {
    method: 'POST',
    path: '/change-password',
    options: Handler.changePassword
  }
]

module.exports = Routes
