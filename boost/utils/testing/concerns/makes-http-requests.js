'use strict'

const PendingRequest = require('./../pending-request')

/**
 * This class intends to simplify HTTP
 * testing and sending requests to
 * the application's hapi server.
 */
class MakesHttpRequests {
  /**
   * Send user credentials to authenticate
   * the request.
   *
   * @param {Object} user
   */
  actAs (user) {
    return new PendingRequest().actAs(user)
  }

  /**
   * Add a request header.
   *
   * @param {String} name
   * @param {String} value
   */
  header (name, value) {
    return new PendingRequest().withHeader(name, value)
  }

  /**
   * Add request headers.
   *
   * @param {Object} headers
   */
  headers (headers) {
    return new PendingRequest().withHeaders(headers)
  }

  /**
   * Add a request cookie.
   *
   * @param {String} name
   * @param {String} value
   */
  cookie (name, value) {
    return new PendingRequest().cookie(name, value)
  }

  /**
   * Create a hapi server without the
   * named middleware.
   *
   * @param {Array<String>} names
   */
  withoutMiddleware (names) {
    return new PendingRequest().withoutMiddleware(names)
  }

  request () {
    return new PendingRequest()
  }

  /**
   * Sent a GET request to the given URI.
   *
   * @param {String|Object} options
   */
  get (args = {}) {
    if (typeof args === 'string') {
      return this.request().inject({ uri: args })
    }

    if (typeof args === 'object') {
      const { headers, uri } = args
      return this.request(headers).get({ uri })
    }

    throw new Error('The HTTP "get" method accepts only a string or an object.')
  }

  /**
   * Sent a POST request to the given URI.
   *
   * @param {Object} arguments
   */
  post ({ uri, headers, payload }) {
    return this.request().post({ uri, headers, payload })
  }

  /**
   * Sent a PUT request to the given URI.
   *
   * @param {Object} arguments
   */
  put ({ uri, headers, payload }) {
    return this.request().inject({ uri, headers, payload })
  }

  /**
   * Sent a PATCH request to the given URI.
   *
   * @param {Object} arguments
   */
  patch ({ uri, headers, payload }) {
    return this.request().inject({ uri, headers, payload })
  }

  /**
   * Sent a DELETE request to the given URI.
   *
   * @param {Object} arguments
   */
  delete ({ uri, headers, payload }) {
    return this.request().inject({ uri, headers, payload })
  }
}

module.exports = MakesHttpRequests
