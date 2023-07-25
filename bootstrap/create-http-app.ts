'use strict'

import { createApp } from './create-app'
import { HttpKernel } from '../app/http/kernel'

/**
 * Creates and returns an HTTP application instance.
 */
export function createHttpApp (): HttpKernel {
  return new HttpKernel(
    createApp()
  )
}
