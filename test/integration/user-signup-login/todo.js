'use strict'

const BaseTest = require('../../base-test')

class LoginTest extends BaseTest {
  before() {}
  beforeEach() {}
  after() {}
  afterEach() {}

  async skipFailsToLoginWithoutPassword() {
    // start method name with "skip": skip this test
  }

  async _thisMethodIsIgnored() {
    console.log('this is ignored')
  }

  async todoTask() {
    // start method name with "todo": mark as todo
  }

  async showLoginPage(t) {
    t.pass()
  }

  async succeedLogin(t) {
    t.pass()
  }
}

module.exports = new LoginTest()
