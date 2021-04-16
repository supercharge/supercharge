'use strict'

import Path from "path"
import { fileURLToPath } from "url"
import { Facade } from "@supercharge/facades";
import { HttpKernel } from './app/http/kernel'
import { Application } from '@supercharge/core'
import { ErrorHandler } from './app/errors/handler'

const __filename = fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

/**
 * Kick off the HTTP server which bind to localhost and the defined
 * `PORT` from your .env file. The required app-root directory
 * defines the starting point to bootstrap the app.
 */

const app = Application
  .createWithAppRoot(__dirname)
  .withErrorHandler(ErrorHandler)
  .booting(app => {
    Facade.setApplication(app)
  })

HttpKernel.for(app).startServer()
