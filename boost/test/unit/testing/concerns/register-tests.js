'use strict'

const BaseTest = util('base-test')

class RegisterTestsTest extends BaseTest {
  async failingTest (t) {
    t.fail()
  }

  async skipTest () {}

  async todoTest () {}
}

module.exports = new RegisterTestsTest()
