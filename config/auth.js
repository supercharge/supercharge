'use strict'

const Path = require('path')
const Env = require(Path.resolve(__dirname, '..', 'utils', 'env'))

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | JWT Auth
  |--------------------------------------------------------------------------
  |
  | You can generate your JWT secret with Node.js’ crypo module.
  | Paste and run the following line into your terminal. Copy the
  | resulting key into the JWT secret variable
  | node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"

  |
  */
  jwt: {
    secret: Env.get('JWT_SECRET_KEY')
  }
}
