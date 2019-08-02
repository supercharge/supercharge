'use strict'

const Env = require('@supercharge/framework/env')

module.exports = {
  /**
   * --------------------------------------------------------------------------
   * Default Queue Connection
   * --------------------------------------------------------------------------
   *
   * tba.
   *
   */
  driver: Env.get('QUEUE_DRIVER', 'sync')

}
