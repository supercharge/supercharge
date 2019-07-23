'use strict'

// const Session = require('@supercharge/framework/session')
const Bootstrapper = require('@supercharge/framework/src/session/bootstrapper')

class SessionBootstrapper extends Bootstrapper {
  constructor (server) {
    super()

    this.server = server
  }

  async boot () {
    // Session.extend()

    await super.boot()
  }
}

module.exports = SessionBootstrapper
