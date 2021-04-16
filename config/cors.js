'use strict'

import { Env } from '@supercharge/facades'

export default {
  /**
   * --------------------------------------------------------------------------
   * Max Age
   * --------------------------------------------------------------------------
   *
   * This setting defines the `Access-Control-Max-Age` header in seconds.
   *
   */
  maxAge: Env.get('STATIC_MAXAGE', 0),

  /**
   * --------------------------------------------------------------------------
   * Allowed HTTP Methods
   * --------------------------------------------------------------------------
   *
   * This setting defines the values for the `Access-Control-Request-Method` header.
   *
   */
  allowMethods: ['GET, HEAD, PUT, POST, DELETE, PATCH'],

}
