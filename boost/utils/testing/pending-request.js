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
    this.routes = []
    this.headers = {}
    this.cookies = {}
    this.payload = {}
    this.excludedMiddleware = []
  }

  /**
   * Create a new hapi server instance
   * for the HTTP test.
   *
   * @returns {Object}
   */
  async createServer () {
    const launch = new Launch()

    await launch.initializeEvents()
    await launch.warmUpCore({ exclude: ['laabr'] })
    await launch.loadMiddleware({ exclude: ['verify-csrf-token'].concat(this.excludedMiddleware) })
    await launch.configureViews()
    await launch.loadAppPlugins()

    this.routes.forEach(route => {
      launch.server.route(route)
    })

    return launch.server
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
    this.headers[name] = value

    return this
  }

  /**
   * Add request headers.
   *
   * @param {Object} headers
   *
   * @returns {PendingRequest}
   */
  withHeaders (headers) {
    Object.assign(this.headers, headers)

    return this
  }

  /**
   * Add request payload.
   *
   * @param {Object} payload
   *
   * @returns {PendingRequest}
   */
  withPayload (payload) {
    Object.assign(this.payload, payload)

    return this
  }

  /**
   * Add a request cookie.
   *
   * @param {String} name
   * @param {String} value
   *
   * @returns {PendingRequest}
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
   *
   * @returns {PendingRequest}
   */
  withoutMiddleware (names) {
    names = Array.isArray(names) ? names : [names]
    this.excludedMiddleware = _.uniq(this.excludedMiddleware.concat(names))

    return this
  }

  /**
   * Send user credentials to authenticate
   * the request.
   *
   * @param {Object} user
   *
   * @returns {PendingRequest}
   */
  actAs (user) {
    this.user = user

    return this
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
    this.routes.push(config)

    return this
  }

  /**
   * Sent a GET request to the given URI.
   *
   * @param {Object} arguments
   *
   * @returns {Object}
   */
  get (params) {
    return this.inject('GET', params)
  }

  /**
   * Sent a POST request to the given URI.
   *
   * @param {Object} arguments
   *
   * @returns {Object}
   */
  post (params) {
    return this.inject('POST', params)
  }

  /**
   * Sent a PUT request to the given URI.
   *
   * @param {Object} arguments
   *
   * @returns {Object}
   */
  put (params) {
    return this.inject('PUT', params)
  }

  /**
   * Sent a PATCH request to the given URI.
   *
   * @param {Object} arguments
   *
   * @returns {Object}
   */
  patch (params) {
    return this.inject('PATCH', params)
  }

  /**
   * Sent a DELETE request to the given URI.
   *
   * @param {Object} arguments
   *
   * @returns {Object}
   */
  delete (params) {
    return this.inject('DELETE', params)
  }

  /**
   * Inject the request and return
   * the response.
   *
   * @param {arguments} arguments
   *
   * @returns {Object}
   */
  async inject (method, params) {
    if (!params) {
      params = method
      method = 'GET'
    }

    const { uri, headers, payload } = params
    const url = typeof params === 'string' ? params : uri

    const server =
      await this
        .withPayload(payload)
        .withHeaders(headers)
        .withHeaders({ cookie: this.formatCookies() })
        .createServer()

    const response = await server.inject({
      url,
      method,
      headers: this.headers,
      payload: this.payload,
      credentials: this.user
    })

    // clean up all listeners
    const signals = ['SIGINT', 'SIGTERM']
    signals.forEach(signal => process.removeAllListeners(signal))

    return response
  }

  /**
   * Format the cookies to an array of strings
   * that will joined and sent as the cookie
   * value with the request.
   *
   * @returns {String}
   */
  formatCookies () {
    return _.map(this.cookies, (value, name) => {
      return Cookie.serialize(name, value)
    }).join('; ')
  }
}

module.exports = PendingRequest
