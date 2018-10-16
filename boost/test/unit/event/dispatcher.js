'use strict'

const Path = require('path')
const BaseTest = util('base-test')
const Dispatcher = util('event/dispatcher')
const TestEvent = require('./fixtures/events/test-event')

class EventTest extends BaseTest {
  before () {
    Dispatcher.removeAllListeners()
  }

  async serialLoadsEventsAndListeners (t) {
    Dispatcher.eventsFolder = Path.resolve(__dirname, 'fixtures', 'events')
    Dispatcher.listenersFolder = Path.resolve(__dirname, 'fixtures', 'listeners')

    await Dispatcher.init()

    const eventName = new TestEvent().emit()

    t.is(Dispatcher.eventNames().length, 1)
    t.true(Dispatcher.eventNames().includes(eventName))

    t.is(Dispatcher.listenerCount(eventName), 1)
    t.is(Dispatcher.listeners(eventName).length, 1)
  }

  async serialLoadsNeitherEventsNorListeners (t) {
    Dispatcher.eventsFolder = Path.resolve(__dirname, 'unavailable')
    Dispatcher.listenersFolder = Path.resolve(__dirname, 'unavailable')

    await Dispatcher.init()

    t.is(Dispatcher.listenerCount(), 0)
  }

  async fireEvent (t) {
    Dispatcher.eventsFolder = Path.resolve(__dirname, 'fixtures', 'events')
    Dispatcher.listenersFolder = Path.resolve(__dirname, 'fixtures', 'listeners')

    await Dispatcher.init()

    const event = new TestEvent()
    const spy = this.spy(event, 'emit')

    await Dispatcher.fire(event)
    t.true(spy.called)
  }

  async ensureEvent (t) {
    class NoEvent {}
    t.throws(() => Dispatcher.ensureEvent(new NoEvent()))
  }

  async ensureListener (t) {
    class NoListener {}
    t.throws(() => Dispatcher.ensureListener(new NoListener()))
  }

  async throwsListenWithoutEventName (t) {
    t.throws(() => Dispatcher.listen())
  }

  async throwsListenWithoutHandler (t) {
    t.throws(() => Dispatcher.listen('event.name'))
  }
}

module.exports = new EventTest()
