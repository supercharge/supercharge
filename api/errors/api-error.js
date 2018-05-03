'use strict'

const Boom = require('boom')

class APIError extends Boom {
  constructor(message, link, statusCode, error) {
    const data = {
      statusCode,
      message,
      error,
      documentationUrl: link
    }

    super(message, data)

    this.data = data
    this.name = 'APIError'
  }
}

module.exports = APIError
