'use strict'

const Handler = {
  index: {
    handler: async (_, h) => h.view('startpage', _, { layout: 'clean' })
  },

  missing: {
    handler: (_, h) => h.view('errors/404').code(404)
  },

  css: {
    handler: { directory: { path: './../supercharge-app/public/css' } }
  },

  js: {
    handler: { directory: { path: './../supercharge-app/public/js' } }
  },

  images: {
    handler: { directory: { path: './../supercharge-app/public/images' } }
  },

  favicon: {
    handler: { file: { path: './../supercharge-app/public/favicon.ico' } }
  }
}

module.exports = Handler
