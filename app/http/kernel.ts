'use strict'

import { HandleCors } from '@supercharge/http'
import { MiddlewareCtor } from '@supercharge/contracts'
import { ServeStaticAssets } from './middleware/serve-static-assets'
import { HttpKernel as Kernel } from '@supercharge/core/dist/src'

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
   * Returns available route-level middleware.
   *
   * @returns {Object}
   */
  routeMiddleware (): { [name: string]: MiddlewareCtor} {
    return {
      // auth: AuthenticateRequest
    }
  }
}
