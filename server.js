'use strict'

/**
 * Kick off the Boost hapi server. This binds to
 * a local address and port. The default logger
 * prints the server's address to the terminal.
 */
const Server = require('./start')
new Server().launchWithFullSpeed()
