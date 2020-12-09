'use strict'

import { RouteServiceProvider } from '../app/providers/route-service-provider'

export const providers: any[] = [
  /**
   * All listed providers will be registered and booted while starting
   * your application. Go ahead and add your own providers to this
   * list to register custom functionality to your application.
   */
  RouteServiceProvider,

  // require('@supercharge/hashing'),
  // require('@supercharge/framework/session/bootstrapper'),
]
