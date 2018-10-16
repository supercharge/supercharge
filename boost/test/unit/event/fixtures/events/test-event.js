'use strict'

const Event = util('event')

class TestEvent extends Event {
  emit () {
    return 'test.event'
  }
}

module.exports = TestEvent
