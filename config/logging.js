'use strict'

const Env = require('@supercharge/framework/env')
const Helper = require('@supercharge/framework/helper')

module.exports = {
  /**
   * --------------------------------------------------------------------------
   * Default Log Driver
   * --------------------------------------------------------------------------
   *
   * This defines the logger(s) for log messages. Supercharge
   * supports three drivers which log to the console,
   * to file or both (stacked).
   *
   * Available drivers: `console`, `file`, `stacked`
   *
   */
  driver: Env.get('LOG_DRIVER', 'console'),

  /**
   * --------------------------------------------------------------------------
   * Log Channel Configurations
   * --------------------------------------------------------------------------
   *
   * This defines the individual configurations for
   * available log channels. A stacked logger will
   * apply all channels and take their configs.
   *
   */
  channels: {
    console: {
      level: Env.get('LOG_LEVEL', 'debug')
    },

    file: {
      level: Env.get('LOG_LEVEL', 'debug'),
      path: Helper.storagePath('logs', Env.get('LOG_FILE', 'app.log'))
    }
  }
}
