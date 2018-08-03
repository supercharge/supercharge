'use strict'

const Handler = {
  index: {
    handler: async (_, h) => h.view('welcome')
  },

  missing: {
    handler: (_, h) => h.view('errors/404').code(404)
  },

  css: {
    handler: {
      directory: { path: './public/css' }
    }
  },

  js: {
    handler: {
      directory: { path: './public/js' }
    }
  },

  favicon: {
    handler: {
      file: { path: './public/favicon.ico' }
    }
  },

  images: {
    handler: {
      directory: { path: './public/images' }
    }
  }
}

module.exports = Handler
