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
    sqs: {
      key: Env.get('AWS_ACCESS_KEY_ID'),
      secret: Env.get('AWS_SECRET_ACCESS_KEY'),
      region: Env.get('AWS_DEFAULT_REGION', 'eu-central-1'),
      prefix: Env.get('AWS_SQS_PREFIX', 'https://sqs.eu-central-1.amazonaws.com/account-id'),
      queue: Env.get('AWS_SQS_QUEUE_NAME', 'your-queue-name')
    },

    faktory: {
      url: Env.get('FAKTORY_QUEUE_URL'),
      host: Env.get('FAKTORY_QUEUE_HOST'),
      port: Env.get('FAKTORY_QUEUE_PORT'),
      password: Env.get('FAKTORY_QUEUE_PASSWORD'),
      queue: Env.get('FAKTORY_QUEUE_NAME', 'default')
    }
  }
}
