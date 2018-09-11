'use strict'

const _ = require('lodash')
const Path = require('path')
const Cookie = require('cookie')
const Launch = require(Path.resolve(__appRoot, 'start'))

/**
 * A helper class to create HTTP requests in
 * tests. This class simplifies HTTP testing
 * as a wrapper around the hapi server.
 */
class PendingRequest {
  /**
   * Create a new instance.
   */
  constructor () {
    this.user = null
    this.headers = {}
    this.cookies = {}
    this.payload = {}
  }

  /**
   * Create a new hapi server instance
   * for the HTTP test.
   */
  async createServer () {
    const launch = new Launch()

    await launch.initializeEvents()
    await launch.warmUpCore({ exclude: ['laabr'] })
    await launch.configureViews()
    await launch.loadMiddleware({ exclude: ['verify-csrf-token'] })
    await launch.loadAppPlugins()

    return launch.server
  }

  /**
   * Add a request header.
   *
   * @param {String} name
   * @param {String} value
   */
  withHeader (name, value) {
    this.headers[name] = value

    return this
  }

  /**
   * Add request headers.
   *
   * @param {Object} headers
   */
  withHeaders (headers) {
    Object.assign(this.headers, headers)

    return this
  }

  /**
   * Add a request cookie.
   *
   * @param {String} name
   * @param {String} value
   */
  cookie (name, value) {
    this.cookies[name] = value

    return this
  }

  /**
   * Create a hapi server without the
   * named middleware.
   *
   * @param {Array<String>} names
   */
  withoutMiddleware (names) {
    names = Array.isArray(names) ? names : [names]

    // TODO

    return this
  }

  /**
   * Send user credentials to authenticate
   * the request.
   *
   * @param {Object} user
   */
  actAs (user) {
    this.user = user

    return this
  }

  /**
   * Sent a GET request to the given URI.
   *
   * @param {Object} arguments
   */
  get ({ uri, headers }) {
    this.withHeaders(headers)

    return this.inject({ method: 'GET', uri })
  }

  /**
   * Sent a POST request to the given URI.
   *
   * @param {Object} arguments
   */
  post ({ uri, headers, payload }) {
    this.withHeaders(headers)
    this.payload = payload

    return this.inject({ method: 'POST', uri })
  }

  /**
   * Sent a PUT request to the given URI.
   *
   * @param {Object} arguments
   */
  put ({ uri, headers, payload }) {
    this.withHeaders(headers)
    this.payload = payload

    return this.inject({ method: 'PUT', uri })
  }

  /**
   * Sent a PATCH request to the given URI.
   *
   * @param {Object} arguments
   */
  patch ({ uri, headers, payload }) {
    this.withHeaders(headers)
    this.payload = payload

    return this.inject({ method: 'PATCH', uri })
  }

  /**
   * Sent a DELETE request to the given URI.
   *
   * @param {Object} arguments
   */
  delete ({ uri, headers, payload }) {
    this.withHeaders = headers
    this.payload = payload

    return this.inject({ method: 'DELETE', uri })
  }

  /**
   * Inject the request and return
   * the response.
   *
   * @param {arguments} arguments
   */
  async inject ({ method, uri: url }) {
    const cookies = this.formatCookies()
    this.withHeaders({ cookie: cookies.join('; ') })

    const server = await this.createServer()

    return server.inject({
      url,
      method,
      headers: this.headers,
      payload: this.payload,
      credentials: this.user
    })
  }

  /**
   * Format the cookies to an array of strings
   * that will joined and sent as the cookie
   * value with the request.
   */
  formatCookies () {
    return _.map(this.cookies, (value, name) => {
      return Cookie.serialize(name, value)
    })
  }
}

module.exports = PendingRequest
