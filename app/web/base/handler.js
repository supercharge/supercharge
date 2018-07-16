'use strict'

const Logger = util('logger')

const Handler = {
  index: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: async function(request, h) {
      Logger.warn('this is a warning message')
      return h.view('index', null, { layout: 'hero' })
    }
  },

  missing: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: (request, h) => {
      return h.view('errors/404').code(404)
    }
  },

  css: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: {
      directory: { path: './public/css' }
    }
  },

  js: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: {
      directory: { path: './public/js' }
    }
  },

  favicon: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: {
      file: { path: './public/favicon.ico' }
    }
  },

  images: {
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: {
      directory: { path: './public/images' }
    }
  }
}

module.exports = Handler
