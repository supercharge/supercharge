/**
 * --------------------------------------------------------------------------
 * Routes
 * --------------------------------------------------------------------------
 *
 * Details and descriptions about this routes files and maybe about routing?
 *
 */

import { Route } from "@supercharge/facades";
import { SayHelloController } from "../app/http/controllers/say-hello";

Route.get('/', async ({ response }) => {
  return response.view('welcome')
})

Route.get('/hello', SayHelloController)
