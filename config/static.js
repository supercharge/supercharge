'use strict'

import Env from '@ioc:supercharge/env'

export default {
  /**
   * --------------------------------------------------------------------------
   * Cache Static Assets
   * --------------------------------------------------------------------------
   *
   * This setting defines the maximum amount of seconds to cache a static
   * resource. A cached item is allowed to be reused until expired.
   *
   * Exmaples:
   *   - `maxage: 0` means no cache
   *   - `maxage: 30` caches a resource for the next 30s
   *
   */
  maxage: Env.get('STATIC_MAXAGE', 0),

  /**
   * --------------------------------------------------------------------------
   * Defer Static Middleware Processing
   * --------------------------------------------------------------------------
   *
   * This setting defines whether to serve static assets afer running
   * `return next()` in your middleware stack. This allows downstream
   * middleware to respond first, before serving static assets.
   *
   */
  defer: Env.get('STATIC_DEFER', false),

  /**
   * --------------------------------------------------------------------------
   * Transfer Hidden Files
   * --------------------------------------------------------------------------
   *
   * This setting defines whether you are allowing to serve hidden files
   * from your assets directory. Static assets are publicly available
   * and serving hidden files may have security implications.
   *
   */
  hidden: Env.get('STATIC_SERVE_HIDDEN', false),

  /**
   * --------------------------------------------------------------------------
   * Served Index File
   * --------------------------------------------------------------------------
   *
   * This setting defines which index file to serve automatically when a
   * request visits the root location. Typically, you’re serving any
   * request using the router. You may use a static file instead.
   *
   */
  index: Env.get('STATIC_INDEX', false),
}
