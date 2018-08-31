'use strict'

const _ = require('lodash')
const Dispatcher = require('./dispatcher')

/**
 * The base class for custom events. Each event
 * in the `app/events` folder must implement
 * this class.
 */
class Event {
  /**
   * Returns the event name. By default, this
   * returns a transformed class name.
   *
   * Example
   * ```
   * class UserRegistered extens Event {}
   * const event = new UserRegistered()
   * console.log(event.emit())
   * -> out put is "user.registered"
   * ```
   *
   * @returns {String}
   */
  emit() {
    return _.kebabCase(this.constructor.name).replace('-', '.')
  }

  /**
   * Fire an event. You can pass either a string
   * that identifies the event or an event
   * instance.
   *
   * @param {object|String} event
   */
  static fire(event) {
    Dispatcher.fire(event)
  }

  /**
   * Create a custom event with event handler.
   *
   * @param {String} event
   * @param {Object} handler
   */
  static on(event, handler) {
    Dispatcher.listen(event, handler)
  }

  /**
   * Create a custom event with event handler.
   *
   * @param {String} event
   * @param {Object} handler
   */
  static listen(event, handler) {
    Dispatcher.listen(event, handler)
  }
}

module.exports = Event
