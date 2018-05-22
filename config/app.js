'use strict'

const Path = require('path')
const Env = require(Path.resolve(__dirname, '..', 'utils', 'env'))

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | App Key
  |--------------------------------------------------------------------------
  |
  | App key is a randomly generated 32 characters long string required
  | to encrypted cookies, sessions and other sensitive data.
  |
  */
  appKey: Env.get('APP_KEY')
}
