'use strict'

const BaseTest = util('base-test')

class LoginTest extends BaseTest {
  async beforeEach ({ context }) {
    context.user = await this.fakeUser()
  }

  async afterEach ({ context }) {
    await this.deleteUser(context.user)
  }

  async showsLoginPage (t) {
    const response = await this.get('/login')

    t.is(response.statusCode, 200)
  }

  async suceedsLogin (t) {
    const user = t.context.user

    const response = await this.post({
      uri: '/login',
      payload: {
        email: user.email,
        password: user.passwordPlain
      }
    })

    t.is(response.statusCode, 302)
    t.is(response.headers['location'], '/home')
  }
}

module.exports = new LoginTest()
