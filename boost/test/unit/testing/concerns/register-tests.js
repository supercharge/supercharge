'use strict'

const BaseTest = util('base-test')

class RegisterTestsTest extends BaseTest {
  async failingTest (t) {
    t.fail()
  }

  async skipTest (t) {
    t.pass()
  }

  async todoTest (t) {
    t.pass()
  }
}

module.exports = new RegisterTestsTest()
