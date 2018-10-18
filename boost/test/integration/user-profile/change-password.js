'use strict'

const User = model('user')
const BaseTest = util('base-test')

class ChangePasswordTest extends BaseTest {
  async beforeEach ({ context }) {
    context.user = await this.fakeUser({ name: 'Marcus' })
  }

  async afterEach ({ context }) {
    await this.deleteUser(context.user)
  }

  async showCchangePasswordPage (t) {
    const response = await this.actAs(t.context.user).get('/change-password')
    t.is(response.statusCode, 200)
  }

  async failsShowingChangePasswordWhenUnauthenticated (t) {
    const response = await this.get('/change-password')

    t.is(response.statusCode, 302)
    t.is(response.headers['location'], `/login?next=${encodeURIComponent('/change-password')}`)
  }
}

module.exports = new ChangePasswordTest()
