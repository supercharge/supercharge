'use strict'

const APIError = require('./api-error')

class APIValidationError extends APIError {
  /**
   * Create a validation error as bad request with HTTP status 400
   *
   * @param {String} message - error message
   * @param {String} link - link to the API documentation
   */
  constructor (message, link) {
    const statusCode = 400
    const error = 'Bad Request'

    super(message, link, statusCode, error)
  }
}

module.exports = APIValidationError
