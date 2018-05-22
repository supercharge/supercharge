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
  key: Env.get('APP_KEY'),

  /*
  |--------------------------------------------------------------------------
  | Application Name
  |--------------------------------------------------------------------------
  |
  | This value is the name of your application. This value is used when the
  | framework needs to place the application's name in a notification or
  | any other location as required by the application or its packages.
  |
  */
  name: Env.get('APP_NAME', 'Future Studio Boost'),

  /*
  |--------------------------------------------------------------------------
  | Application Environment
  |--------------------------------------------------------------------------
  |
  | This value determines the "environment" your application is currently
  | running in. This may determine how you prefer to configure various
  | services your application utilizes. Set this in your ".env" file.
  |
  */
  env: Env.get('APP_ENV', 'production'),

  /*
  |--------------------------------------------------------------------------
  | Web Application Port
  |--------------------------------------------------------------------------
  |
  | This value determines the "environment" your application is currently
  | running in. This may determine how you prefer to configure various
  | services your application utilizes. Set this in your ".env" file.
  |
  */
  port: Env.get('PORT', 3000)
}
