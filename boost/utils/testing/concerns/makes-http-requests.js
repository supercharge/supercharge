'use strict'

const PendingRequest = require('./../pending-request')

class MakesHttpRequests {
  actAs (user) {
    return new PendingRequest().actAs(user)
  }

  header (name, value) {
    return new PendingRequest().header(name, value)
  }

  headers (headers) {
    return new PendingRequest().headers(headers)
  }

  cookie (name, value) {
    return new PendingRequest().cookie(name, value)
  }

  withoutMiddleware (names) {
    return new PendingRequest().withoutMiddleware(names)
  }

  request (headers) {
    return new PendingRequest().headers(headers)
  }

  get ({ uri, headers }) {
    return this.request(headers).inject({ method: 'GET', uri })
  }

  post ({ uri, headers, payload }) {
    return this.request(headers).inject({ method: 'POST', uri, payload })
  }

  put ({ uri, headers, payload }) {
    return this.request(headers).inject({ method: 'PUT', uri, payload })
  }

  patch ({ uri, headers, payload }) {
    return this.request(headers).inject({ method: 'PATCH', uri, payload })
  }

  delete ({ uri, headers, payload }) {
    return this.request(headers).inject({ method: 'DELETE', uri, payload })
  }
}

module.exports = MakesHttpRequests
