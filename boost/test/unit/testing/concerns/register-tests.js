'use strict'

const BaseTest = util('base-test')

class RegisterTestsTest extends BaseTest {
  async failingSkipTest () {
    this.createTest('skipTest')
  }

  async failingTodoTest () {
    this.createTest('todoTest')
  }
}

module.exports = new RegisterTestsTest()
