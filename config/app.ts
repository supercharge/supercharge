'use strict'

import { App, Env } from '@supercharge/facades'
import { ApplicationConfig } from '@supercharge/contracts'

const appConfig: ApplicationConfig = {
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
   * This is your personal application key, should be at least 32 characters
   * long. The app key is used to encrypt cookies and sessions and also by
   * the encrypter utility as a secret to keep your sensitive data safe.
   *
   */
  key: Env.getOrFail('APP_KEY'),

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
   * This is the environment your app runs in. Usually, you want your
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
   * This is the current release version of your application, read from the
   * `package.json` file of this project. You might increase the version
   * with every release you’re publishing to your production server.
   *
   */
  version: App.version(),

  /**
   * --------------------------------------------------------------------------
   * Application Runs Behind a Proxy Server
   * --------------------------------------------------------------------------
   *
   * This setting defines whether your application runs behind a proxy server,
   * like nginx, Apache, Caddy, or any other. If true, the HTTP server uses
   * the given `X-Forwarded-<Host|Proto|For>` request headers preferably.
   *
   */
  runsBehindProxy: Env.isProduction(),
}

export default appConfig
