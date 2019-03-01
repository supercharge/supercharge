'use strict'

const Env = require('@supercharge/framework/env')

module.exports = {
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
   * Router Configuration
   * --------------------------------------------------------------------------
   *
   * This configuration controls how the URIs of incoming
   * requests are matched against the routing table.
   *
   */
  router: {
    /**
     * Removes trailing slashes on incoming paths. Avoids
     * 404 responses because the route is defined as
     * `/route` and the request’s path is `/route/`.
     */
    stripTrailingSlash: true
  }
}
