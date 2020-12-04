'use strict'

import Path from 'path'
import { Middleware } from '@supercharge/contracts'
import { HttpKernel as Kernel } from '@supercharge/http-server/dist/src'

export class HttpKernel extends Kernel {
  middleware (): Middleware[] {
    return [
      //
    ]
  }

  loadRoutesFrom (): string {
    return Path.resolve(
      this.app().basePath(), 'routes/**/*',
    )
  }
}
