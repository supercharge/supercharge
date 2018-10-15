'use strict'

const BaseTest = util('base-test')
const { Transports } = util('mail')
const MailgunTransporter = Transports['mailgun']

class MailgunTransporterTest extends BaseTest {
  async createMailgunTransporter (t) {
    const transporter = new MailgunTransporter({
      auth: {
        api_key: '123'
      }
    })

    t.truthy(transporter)
  }
}

module.exports = new MailgunTransporterTest()
