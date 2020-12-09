'use strict'

import cors from '@koa/cors'
import { HttpContext, Middleware, NextHandler } from '@supercharge/contracts'

const corshandler = cors()

export class HandleCors implements Middleware {
  /**
   * Handle the incoming request.
   *
   * @param ctx HttpContext
   * @param next NextHandler
   */
  async handle (ctx: HttpContext, next: NextHandler): Promise<void> {
    return await corshandler(ctx.raw, next)
  }
}
