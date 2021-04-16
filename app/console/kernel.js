'use strict'

import { ConsoleKernel as Kernel } from '@supercharge/core'

export class ConsoleKernel extends Kernel {
  /**
   * Register the console commands to the application.
   */
  async commands () {
    await this.loadFrom(
      this.app().resolveFromBasePath('app/console/commands'),
    )
  }
}
