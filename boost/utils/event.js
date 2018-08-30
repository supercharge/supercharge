'use strict'

const _ = require('lodash')
const Dispatcher = require('./dispatcher')

class Event {
  emit() {
    return _.kebabCase(this.constructor.name).replace('-', '.')
  }

  static fire(event) {
    Dispatcher.fire(event)
  }

  static listen(event, handler) {
    Dispatcher.listen(event, handler)
  }
}

module.exports = Event
