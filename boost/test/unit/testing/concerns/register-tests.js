'use strict'

const BaseTest = util('base-test')

class RegisterTestsTest extends BaseTest {
  async failingSkipTest (t) {
    this.createTestFromMethod('skipTest')
  }

  async failingTodoTest (t) {
    this.createTestFromMethod('todoTest')
  }
}

module.exports = new RegisterTestsTest()
