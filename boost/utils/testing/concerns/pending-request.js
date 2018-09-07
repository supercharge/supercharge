'use strict'

const Path = require('path')
const Launch = require(Path.resolve(__appRoot, 'start'))

class PendingRequest {
  constructor() {
    this.user = null
    this.server = null
    this.headers = {}
    this.cookies = {}
    this.payload = {}
  }

  async createServer() {
    const launch = new Launch()
    const server = Launch.createHapiServer()
    await launch.initialize(server)

    return server
  }

  withHeader(name, value) {
    this.headers[name] = value

    return this
  }

  withHeaders(headers) {
    Object.assign(this.headers, headers)

    return this
  }

  withoutMiddleware() {
    // TODO

    return this
  }

  actAs(user) {
    this.user = user

    return this
  }

  get({ uri, headers }) {
    this.withHeaders(headers)

    return this.inject({ method: 'GET', uri })
  }

  post({ uri, headers, payload }) {
    this.withHeaders(headers)
    this.payload = payload

    return this.inject({ method: 'POST', uri })
  }

  put({ uri, headers, payload }) {
    this.withHeaders(headers)
    this.payload = payload

    return this.inject({ method: 'PUT', uri })
  }

  patch({ uri, headers, payload }) {
    this.withHeaders(headers)
    this.payload = payload

    return this.inject({ method: 'PATCH', uri })
  }

  delete({ uri, headers, payload }) {
    this.headers = headers
    this.payload = payload

    return this.inject({ method: 'DELETE', uri })
  }

  async inject({ method, uri }) {
    this.server = await this.createServer()

    await this.server.inject({
      method,
      url: uri,
      headers: this.headers,
      payload: this.payload,
      credentials: this.user
    })
  }
}

module.exports = PendingRequest
