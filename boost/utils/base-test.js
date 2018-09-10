'use strict'

const Concerns = require('./testing/concerns')

/**
 * This is the base test class each test should
 * implement. It provides reusable utilities
 * to quickly create powerful test cases.
 */
class BaseTest extends Concerns {
  /**
   * Create a new test case instance.
   */
  constructor () {
    super()

    this.assignHooks()
    this.registerTests()
  }
}

module.exports = BaseTest
