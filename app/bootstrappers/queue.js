'use strict'

// const Queue = require('@supercharge/framework/queue')
const Bootstrapper = require('@supercharge/framework/queue/bootstrapper')

class QueueBootstrapper extends Bootstrapper {
  async boot () {
    // Queue.extend()

    await super.boot()
  }
}

module.exports = QueueBootstrapper
