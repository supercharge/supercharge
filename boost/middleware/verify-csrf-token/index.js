'use strict'

const Config = util('config')

async function register(server) {
  await server.register([
    {
      plugin: require('crumb'),
      options: {
        key: Config.get('session.token'),
        cookieOptions: {
          password: Config.get('app.key'),
          isSecure: Config.get('app.env') === 'production'
        }
      }
    }
  ])
}

exports.plugin = {
  name: 'boost-verify-csrf-token',
  register,
  once: true
}
