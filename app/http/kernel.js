'use strict'

/**
 * @typedef {import('@supercharge/contracts').MiddlewareCtor} MiddlewareCtor
 */

import { HandleCors } from '@supercharge/http'
import { HttpKernel as Kernel } from '@supercharge/core'
import { ServeStaticAssets } from './middleware/serve-static-assets'

export class HttpKernel extends Kernel {
  /**
   * Returns the application’s global middleware stack. Every middleware
   * listed here runs on every request to the application.
   *
   * @returns {MiddlewareCtor[]}
   */
  middleware () {
    return [
      HandleCors,
      ServeStaticAssets,
    ]
  }

  /**
   * Returns available route-level middleware. Use the keys as middleware
   * names when defining routes. For example, require authentication
   * for inidividual routes by using the 'auth' middleware.
   *
   * @example
   * ```
   * Route.middleware('auth').group(() => {
   *   // all routes in this group require authentication
   *
   *   Route.get('/profile', …)
   * })
   * ```
   *
   * @returns {Object}
   */
  routeMiddleware () {
    return {
      // auth: AuthenticateRequest
    }
  }
}
