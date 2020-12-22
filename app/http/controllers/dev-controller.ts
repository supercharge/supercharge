'use strict'

import { HttpContext } from '@supercharge/contracts'

export default class DevController {
  /**
   * Say hello.
   *
   * @param ctx HttpContext
   */
  index (): any {
    return 'Hello Marcus'
  }

  /**
   * Bonjour!
   */
  helloNorman ({ response }: HttpContext): any {
    return response.payload('Bonjour Norman.')
  }
}
