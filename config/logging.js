'use strict'

const Env = util('env')

module.exports = {
  /**
   * --------------------------------------------------------------------------
   * Default Log Driver
   * --------------------------------------------------------------------------
   *
   * This defines the logger(s) for log messages. Boost
   * supports three drivers which log to the console,
   * to file or both (stacked).
   *
   * Available drivers: `console`, `file`, `stacked`
   *
   */
  driver: Env.get('LOG_DRIVER', 'console'),

  /**
   * --------------------------------------------------------------------------
   * Application Log File
   * --------------------------------------------------------------------------
   *
   * This is the destination of all log messages from
   * the file logger. This log file is located within
   * the storage/logs directory.
   *
   */
  logfile: Env.get('LOG_FILE', 'app.log')
}
