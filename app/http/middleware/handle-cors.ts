'use strict'

import cors from '@koa/cors'
import { Middleware as KoaMiddleware } from 'koa'
import { HttpContext, Middleware, NextHandler } from '@supercharge/contracts'

export class HandleCors implements Middleware {
  /**
   * The CORS handler instance.
   */
  private readonly corsHandler: KoaMiddleware

  /**
   * Create a new middleware instance.
   */
  constructor () {
    this.corsHandler = cors()
  }

  /**
   * Handle the incoming request.
   *
   * @param ctx HttpContext
   * @param next NextHandler
   */
  async handle (ctx: HttpContext, next: NextHandler): Promise<void> {
    return await this.corsHandler(ctx.raw, next)
  }
}
