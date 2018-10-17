'use strict'

const BaseTest = util('base-test')

class RegisterTestsTest extends BaseTest {
  async onlyTest (t) {
    t.pass()
  }
}

module.exports = new RegisterTestsTest()
