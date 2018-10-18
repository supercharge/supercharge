'use strict'

const BaseTest = util('base-test')

class ResetPasswordTest extends BaseTest {
  async beforeEach ({ context }) {
    context.user = await this.fakeUser()
  }

  async alwaysAfterEach ({ context }) {
    await this.deleteUser(context.user)
  }

  async showResetPasswordPage (t) {
    t.pass()
  }
}

module.exports = new ResetPasswordTest()
