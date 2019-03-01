'use strict'

const Pkg = require('./../package.json')
const Env = require('@supercharge/framework/env')

module.exports = {
  /**
   * --------------------------------------------------------------------------
   * Application Name
   * --------------------------------------------------------------------------
   *
   * This is the name of your application. Supercharge will use it whenever
   * your app needs idenfication, like in email subject lines or
   * notifcations.
   *
   */
  name: Env.get('APP_NAME', 'Supercharge'),

  /**
   * --------------------------------------------------------------------------
   * Application Description
   * --------------------------------------------------------------------------
   *
   * This is the description of your application. Use this to shortly
   * describe your app and give more identiy. This is useful for
   * page descriptions in terms meta tags for SEO optimizations.
   *
   */
  description: Env.get('APP_DESCRIPTION'),

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
   * Production Check
   * --------------------------------------------------------------------------
   *
   * This configuration controls whether the current deployment
   * runs in production. This shortcut property is helpful to
   * enable view caching or activate secure cookies.
   *
   */
  isProduction: this.env === 'production',

  /**
   * --------------------------------------------------------------------------
   * Application Key
   * --------------------------------------------------------------------------
   *
   * This is your personal application key, at least 32 characters
   * long. It is used to encrypted cookies, sessions and also by
   * the encrypter utility to keep your sensitive data safe.
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
