'use strict'

const BaseTest = util('base-test')

class UserHomeTest extends BaseTest {
  async beforeEach ({ context }) {
    context.user = await this.fakeUser()
  }

  async alwaysAfterEach ({ context }) {
    await this.deleteUser(context.user)
  }

  async showsUserHome (t) {
    const response = await this.actAs(t.context.user).get('/home')
    t.is(response.statusCode, 200)
  }

  async errorWhenUnauthenticated (t) {
    const response = await this.get('/home')

    t.is(response.statusCode, 302)
    t.is(response.headers['location'], `/login?next=${encodeURIComponent('/home')}`)
  }
}

module.exports = new UserHomeTest()
