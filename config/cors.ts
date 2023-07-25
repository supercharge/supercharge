'use strict'

import { Env } from '@supercharge/facades'
import { CorsConfig } from '@supercharge/contracts'

const corsConfig: CorsConfig = {
  /**
   * --------------------------------------------------------------------------
   * Max Age
   * --------------------------------------------------------------------------
   *
   * This setting defines the `Access-Control-Max-Age` header in seconds.
   *
   */
  maxAge: Env.number('STATIC_MAXAGE', 0),

  /**
   * --------------------------------------------------------------------------
   * Allowed HTTP Methods
   * --------------------------------------------------------------------------
   *
   * This setting defines the values for the `Access-Control-Request-Method` header.
   *
   */
  allowedMethods: ['GET, HEAD, PUT, POST, DELETE, PATCH'],
}

export default corsConfig
