'use strict'

const _ = require('lodash')

class Listener {
  on() {
    return _.camelCase(this.constructor.name)
  }

  type() {
    return 'user'
  }

  async handle() {
    throw new Error('Your event listener must implement the async handle() function')
  }
}

module.exports = Listener
