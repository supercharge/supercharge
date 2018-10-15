'use strict'

const BaseTest = util('base-test')
const { Transports } = util('mail')
const SesTransporter = Transports['ses']

class SesTransporterTest extends BaseTest {
  async createSesTransporter (t) {
    const transporter = new SesTransporter()
    t.truthy(transporter)
  }
}

module.exports = new SesTransporterTest()
