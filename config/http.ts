'use strict'

import { Env } from '@supercharge/facades'

export default {
  /**
   * --------------------------------------------------------------------------
   * Web Application Host
   * --------------------------------------------------------------------------
   *
   * This is the default host your hapi web server will bind to. You
   * can change this to a specific IP (0.0.0.0, 192.168.0.1 ) to
   * support the requirements of your application.
   *
   */
  host: Env.get('HOST', 'localhost'),

  /**
   * --------------------------------------------------------------------------
   * Web Application Port
   * --------------------------------------------------------------------------
   *
   * This setting defines the local port the HTTP server server bind to.
   * Use this setting to define a custom port on your system to avoid
   * port collisions with other locally running HTTP processes.
   *
   */
  port: Env.get('PORT', 3000),

  /**
   * --------------------------------------------------------------------------
   * Cookie Settings
   * --------------------------------------------------------------------------
   *
   * This object defines your HTTP cookie settings. These default settings
   * will be used when interacting with cookies. When needed, you can
   * customize these settings for indidual cookies within your app.
   *
   */
  cookie: {
    /**
     * --------------------------------------------------------------------------
     * Time to Live (TTL)
     * --------------------------------------------------------------------------
     *
     * This setting describes the cookie time-to-live (TTL) in milliseconds.
     * You may also provide a human-readable string value, like '14d'.
     * Internally, Supercharge translates the string to a number.
     *
     */
    maxAge: 1234,

    /**
     * --------------------------------------------------------------------------
     * Cookie Path
     * --------------------------------------------------------------------------
     *
     * This setting determines the URL path for which the cookie will be
     * available. Usually, this will be the root path for your application.
     *
     */
    path: '/',

    /**
     * --------------------------------------------------------------------------
     * Same-Site Cookies
     * --------------------------------------------------------------------------
     *
     * Determines whether the browser sends the session cookie along with
     * cross-site requests. This option can prevent CSRF attacks and is
     * disabled in favor of the CSRF protection middleware.
     *
     * Available values: 'lax', 'strict', 'none', true, false
     *
     */
    sameSite: 'lax',

    /**
     * --------------------------------------------------------------------------
     * HTTP Access Only
     * --------------------------------------------------------------------------
     *
     * Determine whether the cookie is available to client-side JavaScript.
     * Setting this value to `true` prevents JavaScript from accessing
     * cookie values. Use `false` to allow JavaScript access.
     *
     */
    httpOnly: true,

    /**
     * --------------------------------------------------------------------------
     * HTTP(S) Cookies Only
     * --------------------------------------------------------------------------
     *
     * This setting determines whether your cookies can be transfered over
     * HTTP connections (secure: false) or require HTTPS (secure: true).
     * This ensures cookies are only sent if it can be done securely.
     *
     */
    secure: Env.isProduction(),
  },
}
