'use strict'

const BaseTest = util('base-test')

class ForgotPasswordTest extends BaseTest {
  async beforeEach ({ context }) {
    context.user = await this.fakeUser()
  }

  async alwaysAfterEach ({ context }) {
    await this.deleteUser(context.user)
  }

  async showForgotPasswordPage (t) {
    t.pass()
  }
}

module.exports = new ForgotPasswordTest()
