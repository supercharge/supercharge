'use strict'

import Path from 'path'
import { HandleCors } from './middleware/handle-cors'
import { MiddlewareCtor } from '@supercharge/contracts'
import { HttpKernel as Kernel } from '@supercharge/http-server/dist/src'

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
    ]
  }

  loadRoutesFrom (): string {
    return Path.resolve(
      this.app().basePath(), 'routes/**/*',
    )
  }
}
