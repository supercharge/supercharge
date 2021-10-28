'use strict'

import { ServeStaticAssetsMiddleware as Middleware } from '@supercharge/http'

export class ServeStaticAssets extends Middleware {
  /**
   * Returns the path to the asset files.
   *
   * @returns {String}
   */
  override assetsLocation (): string {
    return this.app.publicPath()
  }
}
