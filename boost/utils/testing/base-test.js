'use strict'

const Many = require('extends-classes')
const Http = require('./concerns/makes-http-requests')
const FakeData = require('./concerns/creates-fake-data')
const RegistersHook = require('./concerns/registers-hooks')
const RegistersTests = require('./concerns/registers-tests')
const MocksStubsSpies = require('./concerns/creates-stubs-mocks-spies')

/**
 * This is the base test class each test should
 * implement. It provides reusable utilities
 * to quickly create powerful test cases.
 */
class BaseTest extends Many(Http, FakeData, MocksStubsSpies, RegistersHook, RegistersTests) {
  /**
   * Create a new test case instance.
   */
  constructor () {
    super()

    this.assignHooks()
    this.registerTests()
  }

  /**
   * Prints out the method name that
   * is unavailable on a class.
   *
   * @param {String} method
   */
  __call (method) {
    console.log(`'${method}()' is missing in your test class!`)
  }
}

module.exports = BaseTest
