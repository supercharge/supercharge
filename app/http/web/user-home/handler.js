'use strict'

const Handler = {
  home: {
    auth: 'session',
    handler: (_, h) => h.view('home')
  }
}

module.exports = Handler
