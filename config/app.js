'use strict'

import { App, Env } from '@supercharge/facades'

export default {
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
   * Application Version
   * --------------------------------------------------------------------------
   *
   * This is the current version of your application. Create
   * application releases in “semver” style by increasing
   * the version in your package.json file.
   *
   */
  version: App.version(),

  /**
   * --------------------------------------------------------------------------
   * Application Debug Mode
   * --------------------------------------------------------------------------
   *
   * The application shows detailed error messages and stack trace when
   * in debug mode. Otherwise, a generic error message will be send as
   * the response.
   *
   *
   */
  debug: Env.isNotProduction(),
}
