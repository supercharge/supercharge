'use strict'

const Ava = require('ava')

/**
 * Register empty hooks as default
 * for each new test class.
 */
class RegistersHooks {
  /**
   * Run actions before all test cases
   * in the test class. This method
   * runs before `beforeEach`.
   */
  async before () {}

  /**
   * Run actions before each test case
   * in the test class.
   */
  async beforeEach () {}

  /**
   * Run actions after all test cases
   * in the test class. This method
   * runs after `afterEach`.
   */
  async after () {}

  /**
   * Run actions after each test case
   * in the test class.
   */
  async afterEach () {}

  /**
   * Register hooks to the test runner.
   */
  assignHooks () {
    this.assignBeforeHook()
    this.assignBeforeEachHook()
    this.assignAfterHook()
    this.assignAfterEachHook()
  }

  /**
   * Register the `before` hook.
   */
  assignBeforeHook () {
    Ava.before(`${this.constructor.name}: before`, async t => {
      return this.before(t)
    })
  }

  /**
   * Register the `beforeEach` hook.
   */
  assignBeforeEachHook () {
    Ava.beforeEach(`${this.constructor.name}: beforeEach`, async t => {
      return this.beforeEach(t)
    })
  }

  /**
   * Register the `after` hook.
   */
  assignAfterHook () {
    Ava.after(`${this.constructor.name}: after`, async t => {
      return this.after(t)
    })
  }

  /**
   * Register the `afterEach` hook.
   */
  assignAfterEachHook () {
    Ava.afterEach(`${this.constructor.name}: afterEach`, async t => {
      return this.afterEach(t)
    })
  }
}

module.exports = RegistersHooks
