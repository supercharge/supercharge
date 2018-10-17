'use strict'

const Logger = util('logger')
const BaseTest = util('base-test')
const ViewCompiler = util('view/compiler')

class HandlebarsCompilerTest extends BaseTest {
  async failsToRegisterHelper (t) {
    const spy = this.spy(Logger, 'warn')

    const compiler = new ViewCompiler()
    compiler.registerHelper(__dirname, 'not-existent-helper.js')

    t.true(spy.called)
  }
}

module.exports = new HandlebarsCompilerTest()
