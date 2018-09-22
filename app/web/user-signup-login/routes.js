'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/signup',
    options: Handler.showSignup
  },
  {
    method: 'POST',
    path: '/signup',
    options: Handler.signup
  },
  {
    method: 'GET',
    path: '/login',
    options: Handler.showLogin
  },
  {
    method: 'POST',
    path: '/login',
    options: Handler.login
  },
  {
    method: 'GET',
    path: '/logout',
    options: Handler.logout
  },
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
  },
  {
    method: 'GET',
    path: '/reset-password-success',
    options: Handler.resetPasswordSuccess
  }
]

module.exports = Routes
