/**
 * --------------------------------------------------------------------------
 * Routes
 * --------------------------------------------------------------------------
 *
 * Details and descriptions about this routes files and maybe about routing?
 *
 */

import { Route } from "@supercharge/facades";
import DevController from "../app/http/controllers/dev-controller"

Route.get('/', async ({ response }) => {
  return response.view('welcome')
})

Route.get('/hello', DevController)
