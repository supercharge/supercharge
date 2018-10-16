'use strict'

const BaseTest = util('base-test')
const Handlebars = frequire('start/views').handlebars()

class HandlebarsBaseTest extends BaseTest {
  constructor () {
    super()
    this.compiler = Handlebars
  }

  compile (template) {
    return this.compiler.compile(template)
  }

  render (template, data) {
    const renderFunction = this.compile(template)

    return renderFunction(data)
  }
}

module.exports = HandlebarsBaseTest
