'use strict'

const Ava = require('ava')
const _ = require('lodash')
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

  /**
   * Maps the class methods to test methods. Each method
   * is checked for being a private class method, a
   * test to skip, an actual test, and many more.
   */
  registerTests () {
    this.classMethods()
      .filter(this.shouldExclude, this)
      .forEach(methodName => {
        this.createTestFromMethod(methodName)
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
  shouldExclude (methodName) {
    return !this.methodsToSkip().includes(methodName)
  }

  /**
   * A list of methods that should not be
   * assigned as test cases.
   */
  methodsToSkip () {
    return ['constructor', 'before', 'beforeEach', 'after', 'afterEach']
  }

  /**
   * Creates a test from the class method.
   *
   * @param {String} methodName
   */
  createTestFromMethod (methodName) {
    const name = this.readableTestName(methodName)

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
      return this.skip(name, methodName)
    }

    /**
     * Mark method as TODO when starting with "todo*".
     */
    if (_.startsWith(methodName, 'todo')) {
      return this.todo(name)
    }

    /**
     * Mark method as the only one to execute.
     */
    if (_.startsWith(methodName, 'only')) {
      return this.only(name, methodName)
    }

    /**
     * Mark method as failing.
     */
    if (_.startsWith(methodName, 'failing')) {
      return this.failing(name, methodName)
    }

    /**
     * Serial execution for this method.
     */
    if (_.startsWith(methodName, 'serial')) {
      return this.serial(name, methodName)
    }

    /**
     * Create a test that can run in a worker.
     */
    this.addTest(name, methodName)
  }

  /**
   * Create a test based on the class method's
   * implementation.
   *
   * @param {String} name
   * @param {String} methodName
   */
  addTest (name, methodName) {
    Ava(name, async t => this[methodName](t))
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
   * @param {String} methodName
   */
  skip (name, methodName) {
    Ava.skip(name, async t => this[methodName](t))
  }

  /**
   * Create a test method where only this
   * method runs and the other methods
   * in this file are ignored.
   *
   * @param {String} name
   * @param {String} methodName
   */
  only (name, methodName) {
    Ava.only(name, async t => this[methodName](t))
  }

  /**
   * Create a test method that runs in sequence.
   *
   * @param {String} name
   * @param {String} methodName
   */
  serial (name, methodName) {
    Ava.serial(name, async t => this[methodName](t))
  }

  /**
   * Create test method that is expected to fail.
   *
   * @param {String} name
   * @param {String} methodName
   */
  failing (name, methodName) {
    Ava.failing(name, async t => this[methodName](t))
  }

  /**
   * Create a readable test name that transforms
   * the actual test name to a format with
   * spaces that looks like sentence.
   *
   * @example
   *
   * ```
   * emailContainsTheNameOfTheRegisteredUser()
   * ```
   *
   * becomes
   *
   * ```
   * "email contains the name of the registered user"
   * ```
   *
   * @param {String} name
   */
  readableTestName (name) {
    return _.chain(name)
      .kebabCase(name)
      .replace(/-/g, ' ')
      .value()
  }
}

module.exports = BaseTest
