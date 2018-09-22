'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/',
    options: Handler.index
  },
  {
    method: 'GET',
    path: '/js/{path*}',
    options: Handler.js
  },
  {
    method: 'GET',
    path: '/css/{path*}',
    options: Handler.css
  },
  {
    method: 'GET',
    path: '/favicon*',
    options: Handler.favicon
  },
  {
    method: 'GET',
    path: '/images/{path*}',
    options: Handler.images
  },
  {
    method: ['GET'],
    path: '/{path*}',
    options: Handler.missing
  }
]

module.exports = Routes
