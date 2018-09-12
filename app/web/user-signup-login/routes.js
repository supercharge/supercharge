'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/signup',
    config: Handler.showSignup
  },
  {
    method: 'POST',
    path: '/signup',
    config: Handler.signup
  },
  {
    method: 'GET',
    path: '/login',
    config: Handler.showLogin
  },
  {
    method: 'POST',
    path: '/login',
    config: Handler.login
  },
  {
    method: 'GET',
    path: '/logout',
    config: Handler.logout
  },
  {
    method: 'GET',
    path: '/forgot-password',
    config: Handler.showForgotPassword
  },
  {
    method: 'POST',
    path: '/forgot-password',
    config: Handler.forgotPassword
  },
  {
    method: 'GET',
    path: '/reset-password/{email}/{resetToken}',
    config: Handler.showResetPassword
  },
  {
    method: 'POST',
    path: '/reset-password/{email}/{resetToken}',
    config: Handler.resetPassword
  },
  {
    method: 'GET',
    path: '/reset-password-success',
    config: Handler.resetPasswordSuccess
  }
]

module.exports = Routes
