'use strict'

import { HttpContext } from '@supercharge/contracts'

export default class AdminController {
  /**
   * Say hello.
   *
   * @param _
   */
  index (_: HttpContext): string {
    return 'Hello Marcus'
  }
}
