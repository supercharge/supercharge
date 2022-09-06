'use strict'

import { ServiceProvider } from '@supercharge/support'

export class AppServiceProvider extends ServiceProvider {
  /**
   * Register application services to the container.
   */
  override register (): void {
    //
  }

  /**
   * Boot application services.
   */
  override async boot (): Promise<void> {
    //
  }

  /**
   * Stop application services.
   */
  override async shutdown (): Promise<void> {
    //
  }
}
