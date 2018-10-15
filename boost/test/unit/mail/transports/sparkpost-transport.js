'use strict'

const BaseTest = util('base-test')
const { Transports } = util('mail')
const SparkpostTransporter = Transports['sparkpost']

class SparkpostTransporterTest extends BaseTest {
  async createSparkpostTransporter (t) {
    const transporter = new SparkpostTransporter({
      sparkPostApiKey: '123'
    })
    t.truthy(transporter)
  }
}

module.exports = new SparkpostTransporterTest()
