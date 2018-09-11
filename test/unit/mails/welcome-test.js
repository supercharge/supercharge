'use strict'

const Config = util('config')
const BaseTest = util('base-test')
const WelcomeMail = mail('welcome')

class WelcomeTest extends BaseTest {
  async beforeEach ({ context }) {
    context.user = await this.fakeUser()
  }

  async emailContainsTheNameOfTheRegisteredUser (t) {
    const mail = new WelcomeMail(t.context.user)
    const { to, html } = await mail.buildMessage()

    t.true(to.includes(t.context.user.email))
    t.true(html.includes(t.context.user.email))
  }

  async emailHasTheCorrectSubject (t) {
    const mail = new WelcomeMail(t.context.user)
    const { subject } = await mail.buildMessage()

    t.is(subject, `Welcome to ${Config.get('app.name')}!`)
  }
}

module.exports = new WelcomeTest()
