'use strict'

import { HttpKernel as Kernel } from '@supercharge/core'
import { Class, MiddlewareCtor } from '@supercharge/contracts'
import { ServeStaticAssets } from './middleware/serve-static-assets'
import { HandleCorsMiddleware as HandleCors } from '@supercharge/http'
import { StartSessionMiddleware as StartSession } from '@supercharge/session'

export class HttpKernel extends Kernel {
  /**
   * Returns the application’s global middleware stack. Every middleware
   * listed here runs on every request to the application.
   *
   * @returns {MiddlewareCtor[]}
   */
  override middleware (): Array<MiddlewareCtor | Class> {
    return [
      ServeStaticAssets,
      HandleCors,
      StartSession,
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
  override routeMiddleware (): { [name: string]: MiddlewareCtor} {
    return {
      // auth: AuthenticateRequest
    }
  }
}
