'use strict'

import { ServeStaticAssets as Middleware } from '@supercharge/http'

export class ServeStaticAssets extends Middleware {
  /**
   * Returns the path to the asset files.
   *
   * @returns {String}
   */
  assetsLocation (): string {
    return this.app.publicPath()
  }
}
