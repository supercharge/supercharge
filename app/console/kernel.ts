'use strict'

import { ConsoleKernel as Kernel } from '@supercharge/core/dist/src'

export class ConsoleKernel extends Kernel {
  /**
   * Register the console commands to the application.
   */
  async commands (): Promise<void> {
    await this.loadFrom(
      this.app().resolveFromBasePath('app/console/commands'),
    )
  }
}
