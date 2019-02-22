'use strict'

const App = require('@supercharge/framework/application')

/**
 * Kick off the HTTP server which bind to localhost and the defined
 * `PORT` from your .env file. The required app-root directory
 * defines the starting point to bootstrap the app.
 */
new App()
  .fromAppRoot(__dirname)
  .httpWithFullSpeed()
