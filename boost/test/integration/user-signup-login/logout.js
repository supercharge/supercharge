'use strict'

const BaseTest = util('base-test')

class LoginTest extends BaseTest {
  async beforeEach ({ context }) {
    context.user = await this.fakeUser()
  }

  async afterEach ({ context }) {
    await this.deleteUser(context.user)
  }

  async suceedsLogout (t) {
    const user = t.context.user

    const response = await this.actAs(user).get('/logout')

    t.is(response.statusCode, 302)
    t.is(response.headers['location'], '/')
  }
}

module.exports = new LoginTest()
