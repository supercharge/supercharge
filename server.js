'use strict'

/**
 * Register custom Node.js globals before launching
 * the Boost hapi server. Boost heavily uses
 * globals to quickly access project files.
 */
const Globals = require('./start/globals')
new Globals().fromAppRoot(__dirname).create()

/**
 * Kick off the Boost hapi server. This binds to
 * a local address and port. The default logger
 * prints the server's address to the terminal.
 */
const Launch = require('./start')
new Launch().withFullSpeed()
