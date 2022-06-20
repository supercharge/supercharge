'use strict'

import { RouteServiceProvider as ServiceProvider } from '@supercharge/core'

export class RouteServiceProvider extends ServiceProvider {
  /**
   * Boot application services.
   */
  override async boot (): Promise<void> {
    this.loadRoutesFrom(
      this.app().resolveGlobFromBasePath('routes/web.**')
    )
  }
}
