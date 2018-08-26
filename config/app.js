'use strict'

const Env = util('env')
const Pkg = frequire('package.json')

module.exports = {
  /**
   * --------------------------------------------------------------------------
   * Application Name
   * --------------------------------------------------------------------------
   *
   * This is the name of your application. Boost will use it whenever
   * your app needs idenfication, like in email subject lines or
   * notifcations.
   *
   */
  name: Env.get('APP_NAME', 'Boost'),

  /**
   * --------------------------------------------------------------------------
   * Application Environment
   * --------------------------------------------------------------------------
   *
   * This is the environment your app runs in. Usually, youwant your
   * app to behave differently in production and development, like
   * caching views in production but not during development.
   *
   */
  env: Env.get('NODE_ENV', 'development').toLowerCase(),

  /**
   * --------------------------------------------------------------------------
   * Web Application Port
   * --------------------------------------------------------------------------
   *
   * This is default port your hapi web server will bind to. Define
   * a value that is not in use on your host machine to avoid
   * port collisions.
   *
   */
  port: Env.get('PORT', 3000),

  /**
   * --------------------------------------------------------------------------
   * Application Key
   * --------------------------------------------------------------------------
   *
   * This is your personal application key, at least 32 characters
   * long. It is used to encrypted cookies, sessions and also by
   * the encryptor utility to keep your sensitive data safe.
   *
   */
  key: Env.get('APP_KEY'),

  /**
   * --------------------------------------------------------------------------
   * Application Version
   * --------------------------------------------------------------------------
   *
   * This is the current version of your application. Create
   * application releases in “semver” style by increasing
   * the version in your package.json file.
   *
   */
  version: Pkg.version,

  /**
   * --------------------------------------------------------------------------
   * Encryption Algorithm
   * --------------------------------------------------------------------------
   *
   * This defines the default encryption cipher used by the
   * encryptor utility. This AES-256 cipher requires an
   * application key of at least 32 characters.
   *
   */
  cipher: 'AES-256-CBC'
}
