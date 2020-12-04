'use strict'

import 'reflect-metadata'

import { HttpKernel } from './app/http/kernel'
import { Application } from '@supercharge/core/dist/src'

/**
 * Kick off the HTTP server which bind to localhost and the defined
 * `PORT` from your .env file. The required app-root directory
 * defines the starting point to bootstrap the app.
 */

const app = Application.createWithAppRoot(__dirname)

// eslint-disable-next-line @typescript-eslint/no-floating-promises
new HttpKernel(app).startServer()
