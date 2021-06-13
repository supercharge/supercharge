'use strict'

import { Command } from '@supercharge/console'

export default class Inspire extends Command {
  configure() {
    this
      .name('inspire')
      .description('Print an inspiring quote.')
  }

  /**
   * Handle the console command.
   */
  async run () {
    console.log('Sometimes you win. Sometimes you learn.')
  }
}
