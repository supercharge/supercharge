'use strict'

module.exports = {
  /**
   * All listed bootstrappers will be registered and booted while starting
   * your application. Go ahead and add your own bootstrappers to this
   * list to register custom functionality to your application.
   */
  bootstrappers: [
    require('@supercharge/framework/auth/bootstrapper'),
    require('@supercharge/framework/view/bootstrapper'),
    require('@supercharge/framework/database/bootstrapper'),
    require('../app/bootstrappers/session')
  ]
}
