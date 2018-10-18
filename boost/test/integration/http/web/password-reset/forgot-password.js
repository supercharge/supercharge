'use strict'

const User = model('user')
const Mailer = util('mailer')
const BaseTest = util('base-test')

class ForgotPasswordTest extends BaseTest {
  async beforeEach ({ context }) {
    context.user = await this.fakeUser()
  }

  async alwaysAfterEach ({ context }) {
    await this.deleteUser(context.user)
  }

  async showForgotPasswordPage (t) {
    const response = await this.actAs(t.context.user).get('/forgot-password')
    t.is(response.statusCode, 200)
  }

  async showForgotPasswordPageUnauthenticated (t) {
    const response = await this.get('/forgot-password')
    t.is(response.statusCode, 200)
  }

  async redirectsAuthenticatedUserToProfile (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/forgot-password',
      payload: { email: user.email }
    })

    t.is(response.statusCode, 302)
  }

  async serialSucceedsForgotPasswordRequest (t) {
    const user = t.context.user
    const stub = this.stub(Mailer, 'send')

    const response = await this.post({
      uri: '/forgot-password',
      payload: { email: user.email }
    })

    t.is(response.statusCode, 200)

    const updated = await User.findById(user._id)
    t.truthy(updated.passwordResetToken)
    t.truthy(updated.passwordResetDeadline)

    this.sinon().assert.called(stub)
    stub.restore()
  }

  async serialFailsWhenMailerFails (t) {
    const user = t.context.user
    const stub = this.stub(Mailer, 'send').throws(new Error('forgot password mailer error'))

    const response = await this.post({
      uri: '/forgot-password',
      payload: { email: user.email }
    })

    t.is(response.statusCode, 500)
    t.true(response.payload.includes('sending the password reset email'))

    const updated = await User.findById(user._id)
    t.truthy(updated.passwordResetToken)
    t.truthy(updated.passwordResetDeadline)

    stub.restore()
  }

  async failsForgotPasswordWithoutEmail (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/forgot-password',
      payload: {
        // email: user.email
      }
    })

    t.is(response.statusCode, 400)
  }
}

module.exports = new ForgotPasswordTest()
