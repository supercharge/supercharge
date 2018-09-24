'use strict'

const BaseTest = util('base-test')

class SignupTest extends BaseTest {
  async alwaysAfter () {
    await this.deleteUsers()
  }

  async showsSignupPage (t) {
    const response = await this.get('/signup')

    t.is(response.statusCode, 200)
  }

  async todosuceedsSignup (t) {
    // t.is(response.statusCode, 302)
    // t.is(response.headers['location'], '/home')
  }

  async failsDueToMissingEmail (t) {
    const response = await this.post({
      uri: '/signup',
      payload: {
        // email: 'marcus@futurestud.io',
        password: 'password'
      }
    })

    t.is(response.statusCode, 400)
  }

  async failsDueToMissingPassword (t) {
    const response = await this.post({
      uri: '/signup',
      payload: {
        email: 'marcus@futurestud.io'
        // password: 'password'
      }
    })

    t.is(response.statusCode, 400)
  }

  async failsDueToExistingEmail (t) {
    const user = this.fakeUser()

    const response = await this.post({
      uri: '/signup',
      payload: {
        email: user.email,
        password: user.passwordPlain
      }
    })

    t.is(response.statusCode, 400)
  }
}

module.exports = new SignupTest()
