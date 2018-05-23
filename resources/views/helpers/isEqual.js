'use strict'

function isEqual(first, second, options) {
  if (arguments.length < 3) {
    throw new Error('Handlebars Helper "isEqual" needs 2 parameters')
  }

  if (first === second) {
    return options.fn(this)
  }

  return options.inverse(this)
}

module.exports = isEqual
