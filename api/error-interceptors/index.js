'use strict'

const Path = require('path')
const APIErrorInterceptor = require(Path.resolve(__dirname, 'api-error'))
const ValidationErrorInterceptor = require(Path.resolve(__dirname, 'validation-error'))

async function register (server, options) {
  await server.register([
    APIErrorInterceptor,
    ValidationErrorInterceptor
  ])

  server.log('info', 'API Plugin registered: error interceptors (for API and Validation errors)')
}

exports.plugin = {
  name: 'api-error-interceptors',
  version: '1.0.0',
  register
}
