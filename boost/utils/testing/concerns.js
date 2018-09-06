'use strict'

const Many = require('./extend-classes')
const Http = require('./concerns/makes-http-requests')
const FakeData = require('./concerns/creates-fake-data')
const RegistersHook = require('./concerns/registers-hooks')

/**
 * Create a base class that wraps up all
 * test concerns into a single class
 * which extends the base test.
 */
class Concerns extends Many(Http, FakeData, RegistersHook) {}

module.exports = Concerns
