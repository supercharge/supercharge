'use strict'

const _ = require('lodash')

function register (server, options) {
  server.ext('onPreResponse', (request, h) => {
    const response = request.response

    // rendering a view? then add the user object
    if (response.variety && _.isEqual(response.variety, 'view')) {
      response.source.context = response.source.context || {}

      if (request.auth.isAuthenticated && request.user.id) {
        response.source.context.user = request.user
        return h.continue
      }
    }

    return h.continue
  })

  server.log('info', 'Plugin registered: add user model data to views')
}

exports.plugin = {
  name: 'add-user-object-to-views',
  version: '1.0.0',
  register
}
