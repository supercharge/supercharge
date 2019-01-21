'use strict'

const Config = util('config')
const Many = require('extends-classes')
const Http = require('./concerns/makes-http-requests')
const RenderViews = require('./concerns/render-views')
const FakeData = require('./concerns/creates-fake-data')
const MocksConsole = require('./concerns/mocks-console')
const MocksStubsSpies = require('./concerns/creates-stubs-mocks-spies')
const TestRunner = require(`./drivers/${Config.get('testing').driver}`)

/**
 * This is the base test class each test should
 * implement. It provides reusable utilities
 * to quickly create powerful test cases.
 */
class BaseTest extends Many(RenderViews, Http, FakeData, MocksStubsSpies, MocksConsole, TestRunner) {
  /**
   * Create a new test case instance.
   */
  constructor () {
    super()

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
