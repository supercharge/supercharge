'use strict'

/**
 * Check whether two arguments are equal.
 *
 * @param {Mixed} first
 * @param {Mixed} second
 * @param {Object} options
 */
function isEqual (first, second, options) {
  if (arguments.length < 3) {
    throw new Error('Handlebars helper "isEqual" needs 2 parameters')
  }

  return first === second ? options.fn(this) : options.inverse(this)
}

module.exports = isEqual
