'use strict'

const Env = require('@supercharge/framework/env')
const Slug = require('@sindresorhus/slugify')

module.exports = {
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
  cookie: Env.get('SESSION_COOKIE', `${Slug(Env.get('APP_NAME', 'supercharge'), { separator: '_' })}_session`),

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
