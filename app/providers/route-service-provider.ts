'use strict'

import { Route } from "@supercharge/facades";
import { RouteServiceProvider as ServiceProvider } from '@supercharge/core'

export class RouteServiceProvider extends ServiceProvider {
  /**
   * Boot application services.
   */
  async boot (): Promise<void> {
    this.loadRoutesUsing(() => {
      Route.group(() => {
        this.app().resolveGlobFromBasePath('routes/web.**')
      })
    })
  }
}
