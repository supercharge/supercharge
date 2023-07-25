'use strict'

import { createApp } from './create-app'
import { ConsoleKernel } from '../app/console/kernel'
import { ConsoleKernel as ConsoleKernelContract } from '@supercharge/contracts'

/**
 * Creates and returns a console application instance.
 */
export function createConsoleApp (): ConsoleKernelContract {
  return ConsoleKernel.for(
    createApp()
  )
}
