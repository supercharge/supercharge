'use strict'

const User = model('user')
const Logger = util('logger')
const BaseTest = util('base-test')

class SignupTest extends BaseTest {
  async before ({ context }) {
    context.users = []
  }

  async alwaysAfter ({ context }) {
    const deletions = context.users.map(async user => this.deleteUser(user))
    await Promise.all(deletions)
  }

  async showsSignupPage (t) {
    const response = await this.get('/signup')

    t.is(response.statusCode, 200)
  }

  async redirectsAuthenticatedUserWhenRequestingSignupView (t) {
    const user = await this.fakeUser()
    t.context.users.push(user)

    const response = await this.actAs(user).get('/signup')

    t.is(response.statusCode, 302)
  }

  async redirectsAuthenticatedUser (t) {
    const user = await this.fakeUser()
    t.context.users.push(user)

    const response = await this.actAs(user).post({
      uri: '/signup',
      payload: {
        email: user.email,
        password: user.passwordPlain
      }
    })

    t.is(response.statusCode, 302)
  }

  async serialSuceedsSignup (t) {
    const spy = this.spy(Logger, 'info')

    const response = await this.post({
      uri: '/signup',
      payload: {
        email: 'marcus@futurestud.io',
        password: 'password'
      }
    })

    t.is(response.statusCode, 302)
    t.is(response.headers['location'], '/home')

    t.true(spy.called)
    spy.restore()

    const user = await User.findOne({ email: 'marcus@futurestud.io' })
    t.context.users.push(user)
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
    const user = await this.fakeUser()
    t.context.users.push(user)

    const response = await this.post({
      uri: '/signup',
      payload: {
        email: user.email,
        password: user.passwordPlain
      }
    })

    t.is(response.statusCode, 409)
  }
}

module.exports = new SignupTest()
