'use strict'

const Event = util('event')
const BaseTest = util('base-test')

class UnhandledSytemErrorsTest extends BaseTest {
  async todohandlesUnhandledSytemErrorsTest (t) {
    // const spy = this.spy(console, 'log')
    // const stub = this.stub(process, 'exit')

    // Event.fire('unhandledRejection')

    // this.sinon().assert.called(stub)
    // t.true(spy.called)

    // spy.restore()
    // stub.restore()

    t.pass()
  }
}

module.exports = new UnhandledSytemErrorsTest()
