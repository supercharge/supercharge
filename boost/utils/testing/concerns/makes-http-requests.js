'use strict'

const PendingRequest = require('./pending-request')

class MakesHttpRequests {
  actAs(user) {
    return new PendingRequest().actAs(user)
  }

  withHeader(name, value) {
    return new PendingRequest().withHeader(name, value)
  }

  withHeaders(headers) {
    return new PendingRequest().withHeaders(headers)
  }

  withoutMiddleware(names) {
    return new PendingRequest().withoutMiddleware()
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

module.exports = MakesHttpRequests
