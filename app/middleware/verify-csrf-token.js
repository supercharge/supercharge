'use strict'

const Middleware = require('@supercharge/framework/http/middleware/verify-csrf-token')

class VerifyCsrfToken extends Middleware {}

module.exports = VerifyCsrfToken
