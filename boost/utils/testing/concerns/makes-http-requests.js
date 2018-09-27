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

  /**
   * Create a pending request that can
   * be extended before sending it
   * against the server.
   */
  request () {
    return new PendingRequest()
  }

  /**
   * Sent a GET request to the given URI.
   *
   * @param {String|Object} options
   */
  get (params) {
    return this.request().get(params)
  }

  /**
   * Sent a POST request to the given URI.
   *
   * @param {Object} arguments
   */
  post (params) {
    return this.request().post(params)
  }

  /**
   * Sent a PUT request to the given URI.
   *
   * @param {Object} arguments
   */
  put (params) {
    return this.request().put(params)
  }

  /**
   * Sent a PATCH request to the given URI.
   *
   * @param {Object} arguments
   */
  patch (params) {
    return this.request().patch(params)
  }

  /**
   * Sent a DELETE request to the given URI.
   *
   * @param {Object} arguments
   */
  delete (params) {
    return this.request().delete(params)
  }
}

module.exports = MakesHttpRequests
