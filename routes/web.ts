/**
 * --------------------------------------------------------------------------
 * Routes
 * --------------------------------------------------------------------------
 *
 * Details and descriptions about this routes files and maybe about routing?
 *
 */

import { Route } from "@supercharge/facades";

Route.get('/', async ({ response }) => {
  return response.view('welcome')
})

Route.post('/', async () => {
  return 'welcome'
})
