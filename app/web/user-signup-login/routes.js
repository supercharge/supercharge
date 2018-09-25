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
  }
]

module.exports = Routes
