'use strict'

import { ViewServiceProvider } from '@supercharge/view'
import { ServiceProviderCtor } from '@supercharge/contracts'
import { SessionServiceProvider } from '@supercharge/session'
import { RouteServiceProvider } from '../app/providers/route-service-provider'

export const providers: ServiceProviderCtor[] = [
  /**
   * All listed providers will be registered and booted while starting
   * your application. Go ahead and add your own providers to this
   * list to register custom functionality to your application.
   */
  RouteServiceProvider,
  SessionServiceProvider,
  ViewServiceProvider,
]
