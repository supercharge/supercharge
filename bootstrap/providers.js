'use strict'

/**
 * @typedef {import('@supercharge/contracts').ServiceProviderCtor} ServiceProviderCtor
 */

import { ViewServiceProvider } from '@supercharge/view'
import { RouteServiceProvider } from '../app/providers/route-service-provider'

/**
 * Returns the list of service providers.
 *
 * @returns {ServiceProviderCtor[]}
 */
export const providers = [
  /**
   * All listed providers will be registered and booted while starting
   * your application. Go ahead and add your own providers to this
   * list to register custom functionality to your application.
   */
  RouteServiceProvider,
  ViewServiceProvider,
]
