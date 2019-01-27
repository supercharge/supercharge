'use strict'

const User = model('user')
const BaseTest = util('base-test')

class ChangePasswordTest extends BaseTest {
  async showChangePasswordPage (t) {
    const user = await this.fakeUser()

    const response = await this.actAs(user).get('/change-password')
    t.is(response.statusCode, 200)

    await this.deleteUser(user)
  }

  async successPasswordChange (t) {
    const user = await this.fakeUser()

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

    await this.deleteUser(user)
  }

  async failsShowingChangePasswordWhenUnauthenticated (t) {
    const response = await this.get('/change-password')

    t.is(response.statusCode, 302)
    t.is(response.headers['location'], `/login?next=${encodeURIComponent('/change-password')}`)
  }

  async failsToChangePasswordForWrongOldPassword (t) {
    const user = await this.fakeUser()

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

    await this.deleteUser(user)
  }

  async failsToChangePasswordMismatchingNewPasswords (t) {
    const user = await this.fakeUser()

    const response = await this.actAs(user).post({
      uri: '/change-password',
      payload: {
        password: user.passwordPlain,
        newPassword: 'mismatching',
        newPasswordConfirm: 'matching'
      }
    })

    t.is(response.statusCode, 400)

    await this.deleteUser(user)
  }

  async failsToChangePasswordWhenMissingOldPassword (t) {
    const user = await this.fakeUser()

    const response = await this.actAs(user).post({
      uri: '/change-password',
      payload: {
        // password: user.passwordPlain,
        newPassword: 'mismatching',
        newPasswordConfirm: 'mismatching'
      }
    })

    t.is(response.statusCode, 400)

    await this.deleteUser(user)
  }

  async failsToChangePasswordWhenMissingNewPassword (t) {
    const user = await this.fakeUser()

    const response = await this.actAs(user).post({
      uri: '/change-password',
      payload: {
        password: user.passwordPlain,
        // newPassword: 'newpassword',
        newPasswordConfirm: 'newpassword'
      }
    })

    t.is(response.statusCode, 400)

    await this.deleteUser(user)
  }

  async failsToChangePasswordWhenMissingNewPasswordConfirm (t) {
    const user = await this.fakeUser()

    const response = await this.actAs(user).post({
      uri: '/change-password',
      payload: {
        password: user.passwordPlain,
        newPassword: 'newpassword'
        // newPasswordConfirm: 'newpassword'
      }
    })

    t.is(response.statusCode, 400)

    await this.deleteUser(user)
  }

  async failsToChangePasswordWithTooShortPassword (t) {
    const user = await this.fakeUser()

    const response = await this.actAs(user).post({
      uri: '/change-password',
      payload: {
        password: 'new',
        newPassword: 'newpassword',
        newPasswordConfirm: 'newpassword'
      }
    })

    t.is(response.statusCode, 400)

    await this.deleteUser(user)
  }
}

module.exports = new ChangePasswordTest()
