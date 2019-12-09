'use strict'

const Middleware = require('@supercharge/framework/http/middleware/verify-csrf-token')

class VerifyCsrfToken extends Middleware {
  /**
   * Returns an array of URIs that should
   * be excluded from CSRF verfication.
   *
   * @returns {Array}
   */
  get exclude () {
    return [
      // '/stripe/*',
      // '/braintree/*',
      // '/a/webhook/endpoint
    ]
  }
}

module.exports = VerifyCsrfToken
