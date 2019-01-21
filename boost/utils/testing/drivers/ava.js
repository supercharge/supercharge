'use strict'

const Ava = require('ava')
const _ = require('lodash')
const Database = util('database')

class AvaTesting {
  /**
   * Maps the class methods to test methods. Each method
   * is checked for being a private class method, a
   * test to skip, an actual test, and many more.
   */
  registerTests () {
    this.assignHooks()

    this.classMethods()
      .filter(method => this.include(method))
      .forEach(methodName => this.createTest(methodName))
  }

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
      await this.alwaysAfter(t)

      // closing the database connection must be the last action
      await Database.close()
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

  /**
   * Returns all methods from the test class
   */
  classMethods () {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this))
  }

  /**
   * Determine whether the given method should
   * be excluded as a test case.
   *
   * @param {String} methodName
   */
  include (methodName) {
    return !this.methodsToSkip().includes(methodName)
  }

  /**
   * A list of methods that should not be
   * assigned as test cases.
   */
  methodsToSkip () {
    return [
      'constructor',
      'before',
      'beforeEach',
      'after',
      'afterEach',
      'alwaysAfter',
      'alwaysAfterEach'
    ]
  }

  /**
   * Creates a test from the class method.
   *
   * @param {String} methodName
   */
  createTest (methodName) {
    /**
     * Ignore all methods starting with an underscore.
     */
    if (_.startsWith(methodName, '_')) {
      return
    }

    /**
     * Skip methods starting with "skip*".
     */
    if (_.startsWith(methodName, 'skip')) {
      return this.skip(methodName)
    }

    /**
     * Mark method as TODO when starting with "todo*".
     */
    if (_.startsWith(methodName, 'todo')) {
      return this.todo(methodName)
    }

    /**
     * Mark method as the only one to execute.
     */
    if (_.startsWith(methodName, 'only')) {
      return this.only(methodName)
    }

    /**
     * Mark method as failing.
     */
    if (_.startsWith(methodName, 'failing')) {
      return this.failing(methodName)
    }

    /**
     * Serial execution for this method.
     */
    if (_.startsWith(methodName, 'serial')) {
      return this.serial(methodName)
    }

    /**
     * Create a test that can run in a worker.
     */
    this.addTest(methodName)
  }

  /**
   * Create a test based on the class method's
   * implementation.
   *
   * @param {String} name
   */
  addTest (name) {
    Ava(name, async t => this[name](t))
  }

  /**
   * Create a test that is marked as todo.
   * @param {String} name
   */
  todo (name) {
    Ava.todo(name)
  }

  /**
   * Create a test that will be skipped
   * during the test run.
   *
   * @param {String} name
   */
  skip (name) {
    Ava.skip(name)
  }

  /**
   * Create a test method where only this
   * method runs and the other methods
   * in this file are ignored.
   *
   * @param {String} name
   */
  only (name) {
    Ava.only(name, async t => this[name](t))
  }

  /**
   * Create a test method that runs in sequence.
   *
   * @param {String} name
   */
  serial (name) {
    Ava.serial(name, async t => this[name](t))
  }

  /**
   * Create test method that is expected to fail.
   *
   * @param {String} name
   */
  failing (name) {
    Ava.failing(name, async t => this[name](t))
  }
}

module.exports = AvaTesting
