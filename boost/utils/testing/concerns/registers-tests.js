'use strict'

const Ava = require('ava')
const _ = require('lodash')

/**
 * Register all tests that use the base test
 * and class style.
 */
class RegistersTests {
  /**
   * Maps the class methods to test methods. Each method
   * is checked for being a private class method, a
   * test to skip, an actual test, and many more.
   */
  registerTests () {
    this.classMethods()
      .filter(method => this.shouldExclude(method))
      .forEach(methodName => this.createTestFromMethod(methodName))
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
  shouldExclude (methodName) {
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
  createTestFromMethod (methodName) {
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

module.exports = RegistersTests
