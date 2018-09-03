'use strict'

const Handler = {
  home: {
    auth: 'session',
    handler: (_, h) => {
      return h.view('user/dashboard')
    }
  }
}

module.exports = Handler
