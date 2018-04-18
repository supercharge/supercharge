'use strict'

/**
 * Check whether the response is an
 * instance of `APIError`.
 *
 * The `APIError` is a custom error class
 * located within the `api` directory.
 *
 * @param {Object} error instance
 *
 * @returns {boolean}
 */
function isApiError (error) {
  return error.isBoom && error.name === 'APIError'
}

function composeUrl (request, path) {
  // fetch HTTP protocol from reverse proxy
  const proxyProtocol = request.headers && request.headers['x-forwarded-proto']
  // protocol hierarchy: proxy, server, default 'http'
  const protocol = proxyProtocol || request.server.info.protocol || 'http'

  return `${protocol}://${request.info.host}${path}`
}

function register (server, options) {
  server.ext('onPreResponse', (request, h) => {
    const error = request.response

    // check if response is a custom "APIError" error
    // find custom errors in the `api/errors` directory
    if (!isApiError(error)) {
      // no APIError, continue request lifecycle
      return h.continue
    }

    // API errors have their details in a "data" property
    const data = error.data

    // create error response payload
    const payload = Object.assign(data, {
      // add "documentationUrl" if available
      // resolve full API documentation URL
      documentationUrl: data.documentationUrl && composeUrl(request, data.documentationUrl)
    })

    return h.response(payload).code(data.statusCode)
  })
}

exports.plugin = {
  name: 'api-error-interceptor',
  register
}
