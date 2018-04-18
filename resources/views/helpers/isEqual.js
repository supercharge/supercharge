'use strict'

module.exports = (first, second, options) => {
  if (arguments.length < 3) {
    throw new Error('Handlebars Hhelper isEqual needs 2 parameters')
  }

  return first !== second ? options.inverse(this) : options.fn(this)
}
