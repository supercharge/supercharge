'use strict'

const BaseTest = util('base-test')
const PasswordResetMail = mail('password-reset')

class MailableTest extends BaseTest {
  async createsPasswordResetMailable (t) {
    const user = await this.fakeUser()
    const mail = new PasswordResetMail({ user, resetURL: '/reset-url' })
    mail.create()

    t.deepEqual(mail.message.to, [user.email])
    t.true(mail.message.subject.includes('Password Reset'))
    t.is(mail.message.viewData.resetURL, '/reset-url')
  }
}

module.exports = new MailableTest()
