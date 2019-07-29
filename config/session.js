'use strict'

const Slug = require('@sindresorhus/slugify')
const Env = require('@supercharge/framework/env')
const Helper = require('@supercharge/framework/helper')

module.exports = {
  /**
   * --------------------------------------------------------------------------
   * Session Driver
   * --------------------------------------------------------------------------
   *
   * This defines the default session “driver” that will be used on
   * requests. The default “cookie” driver is straightforward to
   * use because it has no dependencies.
   *
   * Supported drivers: "file", "cookie"
   *
   */
  driver: Env.get('SESSION_DRIVER', 'cookie'),

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
     * Session Cookie Name
     * --------------------------------------------------------------------------
     *
     * This defines the cookie name identifying the session.
     *
     */
    name: Env.get(
      'SESSION_COOKIE',
      Slug(`${Env.get('APP_NAME', 'supercharge')}-session`)
    ),

    /**
     * --------------------------------------------------------------------------
     * Session Cookie Path
     * --------------------------------------------------------------------------
     *
     * This defines the cookie’s path scope. This is typically
     * the root path of your application.
     *
     */
    path: '/',

    /**
     * --------------------------------------------------------------------------
     * Secure Cookies (HTTPS Only)
     * --------------------------------------------------------------------------
     *
     * If enabled, the browser will only include the cookie
     * when using an HTTPS connection.
     *
     */
    isSecure: Env.isProduction(),

    /**
     * --------------------------------------------------------------------------
     * HTTP-Only Cookies
     * --------------------------------------------------------------------------
     *
     * Enabling this value will make the cookie only available
     * through the HTTP protocol. It’ll prevent JavaScript
     * from accessing the cookie value.
     *
     */
    isHttpOnly: true,

    /**
     * --------------------------------------------------------------------------
     * Clear Invalid Cookies
     * --------------------------------------------------------------------------
     *
     * If enabled, instructs the browser to remove an invalid
     * session cookie and not keeping it around for
     * subsequent requests.
     *
     */
    clearInvalid: true,

    /**
     * --------------------------------------------------------------------------
     * Same-Site Cookies
     * --------------------------------------------------------------------------
     *
     * Determines whether the browser sends the session cookie along with
     * cross-site requests. This option can prevent CSRF attacks and is
     * disabled in favor of the CSRF protection middleware.
     *
     * Supported values: "false", "Strict", "Lax"
     *
     */
    isSameSite: false
  },

  /**
   * --------------------------------------------------------------------------
   * Session Lifetime
   * --------------------------------------------------------------------------
   *
   * This defines the lifetime of a session cookie. This
   * value is used for web authentication. Defaults to
   * session end on window close.
   *
   */
  lifetime: Env.get('SESSION_LIFETIME', '7d'),

  /**
   * --------------------------------------------------------------------------
   * Session File Location
   * --------------------------------------------------------------------------
   *
   * Using the `file` session driver requires a location
   * where session files are stored. This location is
   * not used for other session drivers than `file`.
   *
   */
  files: Helper.storagePath('framework/sessions')
}
