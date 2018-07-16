'use strict'

const Path = require('path')
const Env = require(Path.resolve(__dirname, '..', 'utils', 'env'))

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Log Driver (Transport)
  |--------------------------------------------------------------------------
  |
  | Driver for log messages. At this point, Boost supports only a single driver
  |
  | Available drivers: `console`, `file`, `stacked`: log to file and console
  |
  */
  driver: Env.get('LOG_DRIVER', 'stacked'),

  /*
  |--------------------------------------------------------------------------
  | App Log File
  |--------------------------------------------------------------------------
  |
  | The app's log file. This is where all log messages go
  |
  */
  logfile: Env.get('LOG_FILE', 'app.log')
}
