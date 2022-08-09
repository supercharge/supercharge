'use strict'

import { HttpContext, HttpResponse } from '@supercharge/contracts'

export class SayHelloController {
  /**
   * Bonjour!
   */
  handle ({ response }: HttpContext): HttpResponse {
    return response.payload('Bonjour Norman.')
  }
}
