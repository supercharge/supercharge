'use strict'

module.exports = [
  {
    method: 'GET',
    path: '/js/{path*}',
    options: {
      handler: { directory: { path: 'public/js' } }
    }
  },
  {
    method: 'GET',
    path: '/css/{path*}',
    options: {
      handler: { directory: { path: 'public/css' } }
    }
  },
  {
    method: 'GET',
    path: '/images/{path*}',
    options: {
      handler: { directory: { path: 'public/images' } }
    }
  },
  {
    method: 'GET',
    path: '/fonts/{path*}',
    options: {
      handler: { directory: { path: 'public/fonts' } }
    }
  },
  {
    method: 'GET',
    path: '/favicon.ico',
    handler: { file: { path: 'public/favicon.ico' } }
  },
  {
    method: 'GET',
    path: '/robots.txt',
    handler: { file: { path: 'public/robots.txt' } }
  }
]
