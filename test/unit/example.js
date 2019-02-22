'use strict'

const BaseTest = require('@supercharge/framework/base-test')

class UnitSampleTest extends BaseTest {
  async exampleTest (t) {
    t.true(true)
  }
}

module.exports = new UnitSampleTest()
