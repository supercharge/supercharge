'use strict'

const Ava = require('ava')
const _ = require('lodash')

class TestRunner {
  constructor() {
    this.assignHooks()

    this.methods()
      .filter(this.shouldInclude, this)
      .forEach(method => {
        const name = this.getTestName(method)

        /**
         * All methods starting with an underscore
         * are seen as private and ignored
         * by the test runner
         */
        if (_.startsWith(method, '_')) {
          return
        }

        /**
         * All methods starting with "skip"
         * will be skipped.
         */
        if (_.startsWith(method, 'skip')) {
          return this.skip(name, method)
        }

        /**
         * All methods starting with "todo"
         * will be marked as TODO.
         */
        if (_.startsWith(method, 'todo')) {
          return this.todo(name)
        }

        if (_.startsWith(method, 'failing')) {
          return this.failing(name, method)
        }

        if (_.startsWith(method, 'only')) {
          return this.only(name, method)
        }

        if (_.startsWith(method, 'serial')) {
          return this.serial(name, method)
        }

        this.addTest(name, method)
      })
  }

  addTest(name, methodName) {
    Ava(name, t => this[methodName](t, Ava))
  }

  todo(name) {
    Ava.todo(name)
  }

  skip(name, methodName) {
    Ava.skip(name, t => this[methodName](t, Ava))
  }

  only(name, methodName) {
    Ava.only(name, t => this[methodName](t, Ava))
  }

  serial(name, methodName) {
    Ava.serial(name, t => this[methodName](t, Ava))
  }

  failing(name, methodName) {
    Ava.failing(name, t => this[methodName](t, Ava))
  }

  getTestName(name) {
    return _.chain(name)
      .kebabCase(name)
      .replace(/-/g, ' ')
      .value()
  }

  methods() {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this))
  }

  shouldInclude(property) {
    return !this.methodsToSkip().includes(property)
  }

  methodsToSkip() {
    return ['constructor', 'before', 'beforeEach', 'after', 'afterEach']
  }

  assignHooks() {
    this.assignBeforeHook()
    this.assignBeforeEachHook()
    this.assignAfterHook()
    this.assignAfterEachHook()
  }

  assignBeforeHook() {
    if (this.before) {
      Ava.before(`${this.constructor.name}: before`, this.before)
    }
  }

  assignBeforeEachHook() {
    if (this.beforeEach) {
      Ava.beforeEach(`${this.constructor.name}: beforeEach`, this.beforeEach)
    }
  }

  assignAfterHook() {
    if (this.after) {
      Ava.after(`${this.constructor.name}: after`, this.after)
    }
  }

  assignAfterEachHook() {
    if (this.afterEach) {
      Ava.afterEach(`${this.constructor.name}: afterEach`, this.afterEach)
    }
  }
}

module.exports = TestRunner
