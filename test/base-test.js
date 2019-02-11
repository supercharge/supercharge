'use strict'

const Path = require('path')
const BaseTest = require('@supercharge/framework/testing/base-test')

class Test extends BaseTest {
  constructor () {
    super({ appRoot: Path.resolve(__dirname, '..') })
  }
}

module.exports = Test
