'use strict'

const Database = util('database')

/**
 * Encapsulates the application shutdown
 * in three stages where you can
 * extend each stage.
 */
class AppShutdown {
  /**
   * This function runs before the
   * Boost web server stops.
   */
  async preServerStop () { }

  /**
   * This function runs after the
   * Boost web server stopped.
   */
  async postServerStop () {
    await Database.close()
  }

  /**
   * This function runs before the
   * Node.js process exits.
   */
  async preShutdown () { }
}

module.exports = new AppShutdown()
