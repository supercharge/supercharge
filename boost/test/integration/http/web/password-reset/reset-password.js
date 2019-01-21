'use strict'

const User = model('user')
const BaseTest = util('base-test')

class ResetPasswordTest extends BaseTest {
  async showResetPasswordPage (t) {
    const user = await this.fakeUser({
      passwordResetDeadline: Date.now() + 1000 * 60 * 60
    })

    const response = await this.actAs(user).get(`/reset-password/${user.email}/${user.passwordResetTokenPlain}`)
    t.is(response.statusCode, 302)

    await this.deleteUser(user)
  }

  async showForgotPasswordPageUnauthenticated (t) {
    const user = await this.fakeUser({
      passwordResetDeadline: Date.now() + 1000 * 60 * 60
    })

    const response = await this.get(`/reset-password/${user.email}/${user.passwordResetTokenPlain}`)
    t.is(response.statusCode, 200)

    await this.deleteUser(user)
  }

  async failsValidationForPasswordResetEmail (t) {
    const response = await this.get('/reset-password/no-email-but-string/token')
    t.is(response.statusCode, 400)
  }

  async redirectsAuthenticatedUserToProfile (t) {
    const user = await this.fakeUser({
      passwordResetDeadline: Date.now() + 1000 * 60 * 60
    })

    const response = await this.actAs(user).post({
      uri: `/reset-password/${user.email}/${user.passwordResetTokenPlain}`,
      payload: {
        password: 'updated',
        passwordConfirm: 'updated'
      }
    })

    t.is(response.statusCode, 302)

    await this.deleteUser(user)
  }

  async succeedsPasswordReset (t) {
    const user = await this.fakeUser({
      passwordResetDeadline: Date.now() + 1000 * 60 * 60
    })

    const response = await this.post({
      uri: `/reset-password/${user.email}/${user.passwordResetTokenPlain}`,
      payload: {
        password: 'updated',
        passwordConfirm: 'updated'
      }
    })

    t.is(response.statusCode, 302)

    const updated = await User.findById(user.id)
    t.falsy(updated.passwordResetToken)
    t.falsy(updated.passwordResetDeadline)

    await t.notThrowsAsync(updated.comparePassword('updated'))
    await this.deleteUser(user)
  }

  async failsWithoutPasswordResetPassword (t) {
    const user = await this.fakeUser({
      passwordResetDeadline: Date.now() + 1000 * 60 * 60
    })

    const response = await this.post({
      uri: `/reset-password/${user.email}/${user.passwordResetTokenPlain}`,
      payload: {
        // password: 'updated',
        passwordConfirm: 'updated'
      }
    })

    t.is(response.statusCode, 400)

    await this.deleteUser(user)
  }

  async failsWithoutPasswordResetPasswordConfirm (t) {
    const user = await this.fakeUser({
      passwordResetDeadline: Date.now() + 1000 * 60 * 60
    })

    const response = await this.post({
      uri: `/reset-password/${user.email}/${user.passwordResetTokenPlain}`,
      payload: {
        password: 'updated'
        // passwordConfirm: 'updated'
      }
    })

    t.is(response.statusCode, 400)

    await this.deleteUser(user)
  }

  async failsForNotRegisteredUser (t) {
    const user = await this.fakeUser({
      passwordResetDeadline: Date.now() + 1000 * 60 * 60
    })
    await this.deleteUser(user)

    const response = await this.post({
      uri: `/reset-password/${user.email}/resettoken`,
      payload: {
        password: 'updated',
        passwordConfirm: 'updated'
      }
    })

    t.is(response.statusCode, 404)
  }

  async failsForWrongResetToken (t) {
    const user = await this.fakeUser({
      passwordResetDeadline: Date.now() + 1000 * 60 * 60
    })

    const response = await this.post({
      uri: `/reset-password/${user.email}/${user.email}`,
      payload: {
        password: 'updated',
        passwordConfirm: 'updated'
      }
    })

    t.is(response.statusCode, 400)

    await this.deleteUser(user)
  }

  async failsForOutdatedResetToken (t) {
    const user = await this.fakeUser({
      passwordResetDeadline: Date.now() - 1000
    })

    const response = await this.post({
      uri: `/reset-password/${user.email}/${user.passwordResetTokenPlain}`,
      payload: {
        password: 'updated',
        passwordConfirm: 'updated'
      }
    })

    t.is(response.statusCode, 400)

    await this.deleteUser(user)
  }
}

module.exports = new ResetPasswordTest()
