'use strict'

import Route from '@ioc:supercharge/route'
import { RouteServiceProvider as ServiceProvider } from '@supercharge/core/dist/src/providers/route-service-provider'

export class RouteServiceProvider extends ServiceProvider {
  /**
   * Boot application services.
   */
  async boot (): Promise<void> {
    this.loadRoutesUsing(() => {
      Route.group(
        this.app().resolveGlobFromBasePath('routes/web.**'),
      )
    })
  }
}
