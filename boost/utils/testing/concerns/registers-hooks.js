'use strict'

const Ava = require('ava')
const Database = util('database')

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
   * This methods always runs after
   * the test cases, even if the
   * tests fail.
   */
  async alwaysAfter () {}

  /**
   * This methods always runs after
   * each of the test cases, even
   * if the tests fail.
   */
  async alwaysAfterEach () {}

  /**
   * Register hooks to the test runner.
   */
  assignHooks () {
    this.assignBeforeHook()
    this.assignBeforeEachHook()
    this.assignAfterHook()
    this.assignAfterEachHook()
    this.assignAlwaysAfterHook()
    this.assignAlwaysAfterEachHook()
  }

  /**
   * Register the `before` hook.
   */
  assignBeforeHook () {
    Ava.before(`${this.constructor.name}: before`, async t => {
      await Database.connect()

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

  /**
   * Register the `after.always` hook.
   */
  assignAlwaysAfterHook () {
    Ava.after.always(`${this.constructor.name}: after.always`, async t => {
      await Database.close()

      return this.alwaysAfter(t)
    })
  }

  /**
   * Register the `afterEach.always` hook.
   */
  assignAlwaysAfterEachHook () {
    Ava.afterEach.always(`${this.constructor.name}: afterEach.always`, async t => {
      return this.alwaysAfterEach(t)
    })
  }
}

module.exports = RegistersHooks
