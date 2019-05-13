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
   * Session Cookie Name
   * --------------------------------------------------------------------------
   *
   * This defines the cookie name which identifies sessions.
   * This cookie name will be used for web sessions using
   * cookies to store individual values.
   *
   */
  cookie: {
    name: Env.get(
      'SESSION_COOKIE',
      `${Slug(Env.get('APP_NAME', 'supercharge'), { separator: '_' })}_session`
    ),

    options: { }
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
  lifetime: Env.get('SESSION_LIFETIME', null),

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
  files: Helper.storagePath('framework/sessions'),

  /**
   * --------------------------------------------------------------------------
   * CSRF Token Name
   * --------------------------------------------------------------------------
   *
   * This token name is used by the `csrf` handlebars helper
   * to protect your users against attacks.The `token`value
   * must be in camelCase and cannot contain a dash.
   *
   */
  token: 'csrfToken'
}
