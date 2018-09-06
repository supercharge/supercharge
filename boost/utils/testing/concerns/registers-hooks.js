'use strict'

const Ava = require('ava')

class RegistersHooks {
  before() {}

  beforeEach() {}

  after() {}

  afterEach() {}

  assignHooks() {
    this.assignBeforeHook()
    this.assignBeforeEachHook()
    this.assignAfterHook()
    this.assignAfterEachHook()
  }

  assignBeforeHook() {
    Ava.before(`${this.constructor.name}: before`, async t => {
      return this.before(t)
    })
  }

  assignBeforeEachHook() {
    Ava.beforeEach(`${this.constructor.name}: beforeEach`, async t => this.beforeEach(t))
  }

  assignAfterHook() {
    Ava.after(`${this.constructor.name}: after`, async t => {
      return this.after(t)
    })
  }

  assignAfterEachHook() {
    Ava.afterEach(`${this.constructor.name}: afterEach`, async t => {
      return this.afterEach(t)
    })
  }
}

module.exports = RegistersHooks
