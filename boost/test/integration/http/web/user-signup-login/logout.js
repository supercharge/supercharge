'use strict'

const BaseTest = util('base-test')

class LoginTest extends BaseTest {
  async beforeEach ({ context }) {
    context.user = await this.fakeUser()
  }

  async alwaysAfterEach ({ context }) {
    await this.deleteUser(context.user)
  }

  async suceedsLogout (t) {
    const response = await this.actAs(t.context.user).get('/logout')

    t.is(response.statusCode, 302)
    t.is(response.headers['location'], '/')
  }

  async redirectsToLoginWhenNotLoggedIn (t) {
    const response = await this.get('/logout')

    t.is(response.statusCode, 302)
    t.is(response.headers['location'], `/login?next=${encodeURIComponent('/logout')}`)
  }
}

module.exports = new LoginTest()
