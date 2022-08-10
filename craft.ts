#!/usr/bin/env node

import { Facade } from '@supercharge/facades'
import { Application } from '@supercharge/core'
import { ErrorHandler } from './app/errors/handler'
import { ConsoleKernel } from './app/console/kernel'

/**
 * Start a command line application, called “craft”. Craft commands
 * can scaffold features or project files. The CLI command will
 * execute in the terminal and terminate itself once finished.
 */
const app = Application
  .createWithAppRoot(__dirname)
  .withErrorHandler(ErrorHandler)
  .onBooting(app => {
    Facade.setApplication(app)
  })

// eslint-disable-next-line @typescript-eslint/no-floating-promises
ConsoleKernel.for(app).run()
