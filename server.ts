'use strict'

import { createHttpApp } from './bootstrap/create-http-app'

/**
 * Kick off the HTTP server which bind to localhost and the defined
 * `PORT` from your .env file. The required app-root directory
 * defines the starting point to bootstrap the app.
 */

createHttpApp()
  .startServer()
  .catch(error => console.error(error))
