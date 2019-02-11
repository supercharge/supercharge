'use strict'

const BaseTest = require('../base-test')

class UnitSampleTest extends BaseTest {
  async exampleTest (t) {
    t.true(true)
  }
}

module.exports = new UnitSampleTest()
