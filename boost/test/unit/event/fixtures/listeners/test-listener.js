'use strict'

const Listener = util('Listener')

class TestListener extends Listener {
  on () {
    return 'test.event'
  }

  async handle () { }
}

module.exports = TestListener
