'use strict'

const BaseTest = util('base-test')
const { Transports } = util('mail')
const SmtpTransporter = Transports['smtp']

class SmtpTransporterTest extends BaseTest {
  async createSmtpTransporter (t) {
    console.log(SmtpTransporter)
    const transporter = new SmtpTransporter()
    t.truthy(transporter)
  }
}

module.exports = new SmtpTransporterTest()
