'use strict'

import { Command } from '@supercharge/core/dist/src'

export default class Inspire extends Command {
  /**
   * Returns the command signature. The command signature will be used to register the
   * console command. Ensure you're not using spaces in your command signatures.
   * Instead, use semicolons as separators, like `make:model`.
   *
   * @returns {String}
   */
  signature (): string {
    return 'inspire'
  }

  /**
   * Returns the command description displayed when calling the help overview.
   *
   * @returns {String}
   */
  description (): string {
    return 'Puper description'
  }

  async handle (..._inputs: any[]): Promise<void> {
    console.log('Sometimes you win. Sometimes you learn.')
  }
}
