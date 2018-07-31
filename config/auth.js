'use strict'

const Env = util('env')

module.exports = {
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
