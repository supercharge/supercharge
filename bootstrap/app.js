'use strict'

module.exports = {
  /**
   * All listed bootstrappers will be registered and booted while starting
   * your application. Go ahead and add your own bootstrappers to this
   * list to register custom functionality to your application.
   */
  bootstrappers: [
    require('@supercharge/framework/queue/bootstrapper'),
    require('@supercharge/framework/session/bootstrapper')
  ]
}
