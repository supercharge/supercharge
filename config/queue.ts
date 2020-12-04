'use strict'

import Env from '@ioc:supercharge/env'

export default {
  /**
   * --------------------------------------------------------------------------
   * Default Queue Connection
   * --------------------------------------------------------------------------
   *
   * Supercharge provides a unified API around a handful of queue backends
   * and services. In your application, you use the same syntax for each
   * connection. This setting defines the default queue connection.
   *
   * Supported drivers: `sync`, `sqs`, `faktory`, `database`
   *
   */
  driver: Env.get('QUEUE_DRIVER', 'sync'),

  /**
   * --------------------------------------------------------------------------
   * Queue Connections
   * --------------------------------------------------------------------------
   *
   * This section configures the individual details of each queue connection.
   * Supercharge ships with built-in support for all the listed connections
   * and you’re free to add your own, custom queue connections.
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
    },

    database: {
      queue: 'default',
      table: 'queue-jobs'
    }
  }
}
