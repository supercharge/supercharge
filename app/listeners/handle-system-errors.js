'use strict'

const Youch = require('youch')
const Listener = util('Listener')
const forTerminal = require('youch-terminal')

class HandleSystemErrors extends Listener {
  on() {
    return ['unhandledRejection', 'uncaughtException']
  }

  type() {
    return 'system'
  }

  async handle(error) {
    const output = await new Youch(error).toJSON()
    console.log(forTerminal(output))
  }
}

module.exports = HandleSystemErrors
