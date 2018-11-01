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
   *
   * @returns {PendingRequest}
   */
  actAs (user) {
    return this.request().actAs(user)
  }

  /**
   * Add a request header.
   *
   * @param {String} name
   * @param {String} value
   *
   * @returns {PendingRequest}
   */
  withHeader (name, value) {
    return this.request().withHeader(name, value)
  }

  /**
   * Add request headers.
   *
   * @param {Object} headers
   *
   * @returns {PendingRequest}
   */
  withHeaders (headers) {
    return this.request().withHeaders(headers)
  }

  /**
   * Add request payload.
   *
   * @param {Object} payload
   *
   * @returns {PendingRequest}
   */
  withPayload (payload) {
    return this.request().withPayload(payload)
  }

  /**
   * Add a request cookie.
   *
   * @param {String} name
   * @param {String} value
   *
   * @returns {PendingRequest}
   */
  withCookie (name, value) {
    return this.request().withCookie(name, value)
  }

  /**
   * Create a hapi server without the
   * named middleware.
   *
   * @param {Array<String>} names
   *
   * @returns {PendingRequest}
   */
  withoutMiddleware (names) {
    return this.request().withoutMiddleware(names)
  }

  /**
   * Add this route to the testing server
   * before sending the request.
   *
   * @param {Object} config
   *
   * @returns {PendingRequest}
   */
  addRoute (config) {
    return this.request().addRoute(config)
  }

  /**
   * Create a pending request that can
   * be extended before sending it
   * against the server.
   *
   * @returns {PendingRequest}
   */
  request () {
    return new PendingRequest()
  }

  /**
   * Sent a GET request to the given URI.
   *
   * @param {String|Object} options
   *
   * @returns {Object}
   */
  get (params) {
    return this.request().get(params)
  }

  /**
   * Sent a POST request to the given URI.
   *
   * @param {Object} arguments
   *
   * @returns {Object}
   */
  post (params) {
    return this.request().post(params)
  }

  /**
   * Sent a PUT request to the given URI.
   *
   * @param {Object} arguments
   *
   * @returns {Object}
   */
  put (params) {
    return this.request().put(params)
  }

  /**
   * Sent a PATCH request to the given URI.
   *
   * @param {Object} arguments
   *
   * @returns {Object}
   */
  patch (params) {
    return this.request().patch(params)
  }

  /**
   * Sent a DELETE request to the given URI.
   *
   * @param {Object} arguments
   *
   * @returns {Object}
   */
  delete (params) {
    return this.request().delete(params)
  }
}

module.exports = MakesHttpRequests
