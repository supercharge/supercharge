'use strict'

import Str from '@supercharge/strings'
import { App, Env } from '@supercharge/facades'
import { SessionConfig } from '@supercharge/contracts'

const sessionConfig: SessionConfig = {
  /**
   * --------------------------------------------------------------------------
   * Session Driver
   * --------------------------------------------------------------------------
   *
   * This defines the default session “driver” that will be used on requests.
   * The default “cookie” driver is straightforward to
   * use because it has no dependencies.
   *
   * Supported drivers: "memory", "cookie"
   *
   */
  driver: Env.get('SESSION_DRIVER', 'cookie'),

  /**
   * --------------------------------------------------------------------------
   * Session Cookie Name
   * --------------------------------------------------------------------------
   *
   * This setting defines the name of your session cookie. The session cookie
   * identifies a session instance by a unique ID. You can adjust the name
   * of that cookie to your needs and the framework will use that name.
   *
   */
   name: Env.get(
    'SESSION_COOKIE_NAME',
    Str(Env.get('APP_NAME', 'supercharge')).concat('-session').kebab().get(),
  ),

  /**
   * --------------------------------------------------------------------------
   * Session Lifetime
   * --------------------------------------------------------------------------
   *
   * This setting defines the lifetime of a session cookie. The value can be a
   * number representing the lifetime in seconds or a string representing the
   * lifetime in a human-readable format, like '2h', '7d', or '30 days'. You
   * may set the option to expire a session when the browser window closes.
   *
   */
  lifetime: Env.get('SESSION_LIFETIME', '7d'),

  expireOnClose: Env.get('SESSION_EXPIRE_ON_CLOSE', false),

  /**
   * --------------------------------------------------------------------------
   * Session Cookie Options
   * --------------------------------------------------------------------------
   *
   * This defines the session cookie options. Theses options are
   * used to create a session cookie. These options also apply
   * when using the `cookie` session driver.
   *
   */
  cookie: {
    /**
     * --------------------------------------------------------------------------
     * Session Cookie Path
     * --------------------------------------------------------------------------
     *
     * This defines the cookie’s path scope. This is typically the root path of
     * your application. You can refine the URL path of the session cookie if
     * you want it to be available only for given sections of your website.
     *
     */
    path: '/',

    /**
     * --------------------------------------------------------------------------
     * Secure Cookies (HTTPS Only)
     * --------------------------------------------------------------------------
     *
     * If enabled, the browser will only include the cookie when using an HTTPS
     * connection. This keeps your session cookie secure by not sending it on
     * insecure connections. You typically want this enabled in production.
     *
     */
    isSecure: Env.isProduction(),

    /**
     * --------------------------------------------------------------------------
     * HTTP-Only Cookies
     * --------------------------------------------------------------------------
     *
     * Enabling this value will make the cookie only available through the HTTP
     * protocol. It’ll prevent JavaScript from accessing the cookie value and
     * only allow access via the HTTP protocol. Change this to your needs.
     *
     */
    isHttpOnly: true,

    /**
     * --------------------------------------------------------------------------
     * Same-Site Cookies
     * --------------------------------------------------------------------------
     *
     * Determines whether the browser sends the session cookie along with
     * cross-site requests. This option can prevent CSRF attacks and is
     * disabled in favor of the CSRF protection middleware.
     *
     * Available values: 'strict' | 'lax' | 'none' | true | false
     */
    sameSite: 'lax',
  },

  /**
   * --------------------------------------------------------------------------
   * Session File Location
   * --------------------------------------------------------------------------
   *
   * Using the `file` session driver requires a location to store session files
   * on disk. This location is only used for file-based sessions using the
   * `file` driver. You can change the location to a desired directory.
   *
   */
  files: App.storagePath('framework/sessions'),
}

export default sessionConfig
