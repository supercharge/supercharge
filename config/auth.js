'use strict'

const Env = require('@supercharge/framework/env')

module.exports = {
  /**
   * --------------------------------------------------------------------------
   * Default Authentication Strategy
   * --------------------------------------------------------------------------
   *
   * This configuration controls the default authentication strategy and mode.
   * Valid values are a single string representing the strategy name or an
   * object with two keys: `strategy` and `mode`. Find more details here:
   * - https://hapijs.com/api#-routeoptionsauthmode
   * - https://hapijs.com/tutorials/auth#user-content-setting-a-default-strategy
   *
   */
  default: {
    strategy: 'web',
    mode: 'try'
  },

  /**
   * --------------------------------------------------------------------------
   * Redirect after Authentication
   * --------------------------------------------------------------------------
   *
   * This configuration defines the redirects for successful
   * authentications, like sign up, login, and password
   * reset. Configure the individual destinations.
   *
   */
  redirects: {
    /**
     * This redirect is called after successfully signing
     * up for your app.
     */
    signup: Env.get('AUTH_REDIRECT_SIGNUP', '/home'),

    /**
     * This redirect is called after successfully logging
     * into your app.
     */
    login: Env.get('AUTH_REDIRECT_LOGIN', '/home'),

    /**
     * This redirect is called after successfully resetting
     * the password.
     */
    passwordReset: Env.get('AUTH_REDIRECT_PASSWORD_RESET', '/home')
  }
}
