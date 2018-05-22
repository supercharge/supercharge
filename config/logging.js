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
  | Available drivers: `console`
  |
  */
  driver: Env.get('LOG_DRIVER', 'console')
}
