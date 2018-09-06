'use strict'

/**
 * A helper function to extend a class with
 * multiple classes.
 * Originally from here: https://github.com/jarradseers/extends-classes
 *
 * @param  {...any} classes
 */
function classes(...classes) {
  const constructors = []

  /**
   * Skeleton Class.
   */
  class Class {
    /**
     * Creates an instance of Class.
     */
    constructor(...opts) {
      for (const className of classes) {
        const props = Object.getOwnPropertyNames(className.prototype)

        for (const prop of props) {
          if (prop === 'constructor') {
            constructors.push(className.prototype.constructor)
          } else {
            Class.prototype[prop] = className.prototype[prop]
          }
        }
      }

      for (const constructor of constructors) {
        Object.assign(Class.prototype, new constructor(...opts))
      }
    }
  }

  return Class
}

module.exports = classes
