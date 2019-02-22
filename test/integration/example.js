'use strict'

const BaseTest = require('@supercharge/framework/base-test')

class IntegrationSampleTest extends BaseTest {
  async showWelcome (t) {
    const response = await this.get('/')
    t.is(response.statusCode, 200)
  }
}

module.exports = new IntegrationSampleTest()
