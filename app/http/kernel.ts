'use strict'

import { HandleCors } from '@supercharge/http'
import { MiddlewareCtor } from '@supercharge/contracts'
import { HttpKernel as Kernel } from '@supercharge/core/dist/src'
import { ServeStaticAssets } from './middleware/serve-static-assets'

export class HttpKernel extends Kernel {
  /**
   * Returns the application’s global middleware stack. Every middleware
   * listed here runs on every request to the application.
   *
   * @returns {MiddlewareCtor[]}
   */
  middleware (): MiddlewareCtor[] {
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
  routeMiddleware (): { [name: string]: MiddlewareCtor} {
    return {
      // auth: AuthenticateRequest
    }
  }
}
