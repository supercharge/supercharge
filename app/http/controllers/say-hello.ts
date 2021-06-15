'use strict'

import { HttpContext } from '@supercharge/contracts'

export class SayHelloController {
  /**
   * Bonjour!
   */
   handle ({ response }: HttpContext) {
    return response.payload('Bonjour Norman.')
  }}
