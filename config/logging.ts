'use strict'

import Path from 'path'
import { App, Env } from '@supercharge/facades'
import { LoggingConfig } from '@supercharge/contracts'

const loggingConfig: LoggingConfig = {
  /**
   * --------------------------------------------------------------------------
   * Default Log Driver
   * --------------------------------------------------------------------------
   *
   * This defines the logger(s) for log messages. Supercharge
   * supports three drivers which log to the console,
   * to file or both (stacked).
   *
   * Available drivers: `console`, `file`
   *
   */
  driver: Env.get('LOG_DRIVER', 'console'),

  /**
   * --------------------------------------------------------------------------
   * Log Channel Configurations
   * --------------------------------------------------------------------------
   *
   * This setting defines the individual configurations for available logging
   * channels. A logging channel is the output destination for log messages.
   * Configure your log destinations individually using the given options.
   *
   */
  channels: {
    console: {
      level: Env.get('LOG_LEVEL', 'debug'),
    },

    file: {
      level: Env.get('LOG_LEVEL', 'debug'),
      path: Path.resolve(
        App.storagePath('logs'), Env.get('LOG_FILE', 'app.log'),
      ),
    },
  },
}

export default loggingConfig
