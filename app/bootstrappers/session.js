'use strict'

// const Session = require('@supercharge/framework/session')
const Bootstrapper = require('@supercharge/framework/session/bootstrapper')

class SessionBootstrapper extends Bootstrapper {
  async boot () {
    // Session.extend('driver-name', DriverClassImplementation)

    await super.boot()
  }
}

module.exports = SessionBootstrapper
