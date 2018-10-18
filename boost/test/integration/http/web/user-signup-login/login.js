'use strict'

const BaseTest = util('base-test')

class LoginTest extends BaseTest {
  async beforeEach ({ context }) {
    context.user = await this.fakeUser()
  }

  async alwaysAfterEach ({ context }) {
    await this.deleteUser(context.user)
  }

  async showsLoginPage (t) {
    const response = await this.get('/login')

    t.is(response.statusCode, 200)
  }

  async redirectsAuthenticatedUserWhenRequestingLoginView (t) {
    const response = await this.actAs(t.context.user).get('/login')

    t.is(response.statusCode, 302)
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

  async failsToLoginWithUnregisteredEmail (t) {
    const response = await this.post({
      uri: '/login',
      payload: {
        email: 'unregistered@futurestud.io',
        password: t.context.user.passwordPlain
      }
    })

    t.is(response.statusCode, 404)
  }

  async failsToLoginWithWrongPassword (t) {
    const response = await this.post({
      uri: '/login',
      payload: {
        email: t.context.user.email,
        password: 'wrong-password'
      }
    })

    t.is(response.statusCode, 400)
  }

  async failsToLoginWithoutEmail (t) {
    const response = await this.post({
      uri: '/login',
      payload: {
        // email: t.context.user.email,
        password: t.context.user.passwordPlain
      }
    })

    t.is(response.statusCode, 400)
  }

  async failsToLoginWithoutPassword (t) {
    const response = await this.post({
      uri: '/login',
      payload: {
        email: t.context.user.email
        // password: t.context.user.passwordPlain
      }
    })

    t.is(response.statusCode, 400)
  }

  async redirectsAuthenticatedUser (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/login',
      payload: {
        email: user.email,
        password: user.passwordPlain
      }
    })

    t.is(response.statusCode, 302)
  }
}

module.exports = new LoginTest()
