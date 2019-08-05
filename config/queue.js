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
  driver: Env.get('QUEUE_DRIVER', 'sync'),

  /**
   * --------------------------------------------------------------------------
   * Queue Connections
   * --------------------------------------------------------------------------
   *
   * tba.
   *
   */
  connections: {
    faktory: {
      url: Env.get('FAKTORY_QUEUE_URL'),
      host: Env.get('FAKTORY_QUEUE_HOST'),
      port: Env.get('FAKTORY_QUEUE_PORT'),
      password: Env.get('FAKTORY_QUEUE_PASSWORD'),
      queue: Env.get('FAKTORY_QUEUE_NAME', 'default')
    }
  }
}
