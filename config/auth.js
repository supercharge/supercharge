'use strict'

const Env = require('@supercharge/framework/env')

module.exports = {
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
    passwordReset: Env.get('AUTH_REDIRECT_PASSWORD_RESET', '/reset-password-success')

  },

  /**
   * --------------------------------------------------------------------------
   * JWT Auth
   * --------------------------------------------------------------------------
   *
   * This configuration is used to for JWT authentication.
   * The secret key is used to encrypt the JSON web tokens
   * that are only decryptable by your application.
   *
   */
  jwt: {
    secret: Env.get('JWT_SECRET_KEY')
  }
}
