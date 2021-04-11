'use strict'

import { Facade } from "@supercharge/facades";
import { HttpKernel } from './app/http/kernel'
import { Application } from '@supercharge/core'
import { ErrorHandler } from './app/errors/handler'

/**
 * Kick off the HTTP server which bind to localhost and the defined
 * `PORT` from your .env file. The required app-root directory
 * defines the starting point to bootstrap the app.
 */

const app = Application
  .createWithAppRoot(__dirname)
  .withErrorHandler(ErrorHandler)
  .booting((app: Application) => {
    Facade.setApplication(app)
  })

// eslint-disable-next-line @typescript-eslint/no-floating-promises
HttpKernel.for(app).startServer()
