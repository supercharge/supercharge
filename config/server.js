'use strict'

module.exports = {
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
