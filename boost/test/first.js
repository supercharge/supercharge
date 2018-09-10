'use strict'

const BaseTest = util('base-test')

class First extends BaseTest {
  first (t) {
    t.pass()
  }
}

module.exports = new First()
