'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/forgot-password',
    options: Handler.showForgotPassword
  },
  {
    method: 'POST',
    path: '/forgot-password',
    options: Handler.forgotPassword
  },
  {
    method: 'GET',
    path: '/reset-password/{email}/{resetToken}',
    options: Handler.showResetPassword
  },
  {
    method: 'POST',
    path: '/reset-password/{email}/{resetToken}',
    options: Handler.resetPassword
  }
]

module.exports = Routes
