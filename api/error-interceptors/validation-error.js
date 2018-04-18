'use strict'

/**
 * Check whether the response is
 * a `ValidationError`.
 *
 * The `ValidationError` is an error
 * from hapi itself. hapi throws these errors,
 * because we told it so within the
 * API server options (`server.js`)
 *
 * @param {Object} error instance
 *
 * @returns {boolean}
 */
function isHapiValidationError (error) {
  return error.isBoom && error.name === 'ValidationError'
}

function register (server, options) {
  server.ext('onPreResponse', (request, h) => {
    const error = request.response

    // the API server instance globally throws all validation errors
    // find the global throw-up config in the `server.js` ;-)
    if (!isHapiValidationError(error)) {
      // no ValidationError, continue request lifecycle
      return h.continue
    }

    // validation errors in hapi contain an array called "details"
    // this "details" array contains all validation errors
    // pick the first error
    const data = error.details[0]

    // compose the custom error message in "oppa-hapi-style"
    const payload = {
      statusCode: 400,
      error: 'Bad Request',
      message: data.message
    }

    return h.response(payload).code(payload.statusCode)
  })
}

exports.plugin = {
  name: 'hapi-validation-error-interceptor',
  register
}
