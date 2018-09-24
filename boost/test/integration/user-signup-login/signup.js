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

  async todofailsDueToMissingEmail (t) {
    // t.is(response.statusCode, 400)

    t.pass()
  }

  async todofailsDueToMissingPassword (t) {
    // t.is(response.statusCode, 400)

    t.pass()
  }

  async todofailsDueToExistingEmail (t) {
    // t.is(response.statusCode, 400)

    t.pass()
  }
}

module.exports = new SignupTest()
