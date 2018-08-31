'use strict'

/**
 * The base class for event listeners. Each listener
 * in the `app/listeners` folder must implement
 * this class.
 */
class Listener {
  /**
   * Returns the event name or an array of event
   * names to listen on.
   *
   * @returns {String|Array}
   */
  on() {
    throw new Error(`${this.contructor.name} must implement the on() function.`)
  }

  /**
   * Implement your event handling in this `handle`
   * method. Implement it as an async function.
   */
  async handle() {
    throw new Error('Your event listener must implement the async handle() function')
  }

  /**
   * The event dispatcher supports the `user`
   * and `system` types. Use the type
   * `system` for Node.js process listeners,
   * type `user` for your custom events.
   */
  type() {
    return 'user'
  }
}

module.exports = Listener
