'use strict'

import Middleware from '@supercharge/http-server/middleware/verify-csrf-token'

export default class VerifyCsrfToken extends Middleware {
  /**
   * Returns an array of URIs that should be excluded from CSRF verfication.
   *
   * @returns {Array}
   */
  exclude (): string[] {
    return [
      // '/stripe/*',
      // '/braintree/*',
      // '/a/webhook/endpoint
    ]
  }
}
