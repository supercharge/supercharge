'use strict'

const Handler = {
  home: {
    auth: 'session',
    handler: (_, h) => {
      return h.view('user/home')
    }
  }
}

module.exports = Handler
