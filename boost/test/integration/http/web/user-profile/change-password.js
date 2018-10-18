'use strict'

const User = model('user')
const BaseTest = util('base-test')

class ChangePasswordTest extends BaseTest {
  async beforeEach ({ context }) {
    context.user = await this.fakeUser({ name: 'Marcus' })
  }

  async alwaysAfterEach ({ context }) {
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

  async successPasswordChange (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/change-password',
      payload: {
        password: user.passwordPlain,
        newPassword: 'updated',
        newPasswordConfirm: 'updated'
      }
    })

    t.is(response.statusCode, 200)

    const updated = await User.findById(user.id)
    t.truthy(await updated.comparePassword('updated'))
    await t.throwsAsync(updated.comparePassword(user.passwordPlain))
  }

  async failsToChangePasswordForWrongOldPassword (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/change-password',
      payload: {
        password: 'wrong-password',
        newPassword: 'updated',
        newPasswordConfirm: 'updated'
      }
    })

    t.is(response.statusCode, 400)

    const updated = await User.findById(user.id)
    t.truthy(await updated.comparePassword(user.passwordPlain))
  }

  async failsToChangePasswordMismatchingNewPasswords (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/change-password',
      payload: {
        password: user.passwordPlain,
        newPassword: 'mismatching',
        newPasswordConfirm: 'matching'
      }
    })

    t.is(response.statusCode, 400)
  }

  async failsToChangePasswordWhenMissingOldPassword (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/change-password',
      payload: {
        // password: user.passwordPlain,
        newPassword: 'mismatching',
        newPasswordConfirm: 'matching'
      }
    })

    t.is(response.statusCode, 400)
  }

  async failsToChangePasswordWhenMissingNewPassword (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/change-password',
      payload: {
        password: user.passwordPlain,
        // newPassword: 'newpassword',
        newPasswordConfirm: 'newpassword'
      }
    })

    t.is(response.statusCode, 400)
  }

  async failsToChangePasswordWhenMissingNewPasswordConfirm (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/change-password',
      payload: {
        password: user.passwordPlain,
        newPassword: 'newpassword'
        // newPasswordConfirm: 'newpassword'
      }
    })

    t.is(response.statusCode, 400)
  }

  async failsToChangePasswordWithTooShortPassword (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/change-password',
      payload: {
        password: 'new',
        newPassword: 'newpassword',
        newPasswordConfirm: 'newpassword'
      }
    })

    t.is(response.statusCode, 400)
  }
}

module.exports = new ChangePasswordTest()
