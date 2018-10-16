'use strict'

const BaseTest = require('./handlebars-base-test')

class CsrfHelperTest extends BaseTest {
  async addsCsrfToken (t) {
    console.log(this.compiler)
    t.pass()
  }
}

module.exports = new CsrfHelperTest()
