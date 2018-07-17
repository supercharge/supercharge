'use strict'

function register(server) {
  server.ext('onPreResponse', (request, h) => {
    const { variety = '', source } = request.response

    // rendering a view? then add the user object
    if (variety === 'view') {
      source.context = source.context || {}

      if (source.context.user) {
        return h.continue
      }

      if (request.auth.isAuthenticated && request.user.id) {
        source.context.user = request.user
        return h.continue
      }
    }

    return h.continue
  })

  server.log('info', 'Plugin registered: add user model to view context')
}

exports.plugin = {
  name: 'boost-web-add-user-object-to-views',
  version: '1.0.0',
  register,
  once: true
}
