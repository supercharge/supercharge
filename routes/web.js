/**
 * --------------------------------------------------------------------------
 * Routes
 * --------------------------------------------------------------------------
 *
 * Details and descriptions about this routes files and maybe about routing?
 *
 */

import Route from '@ioc:supercharge/route'

Route.get('/', async ({ response }) => {
  return response.view('welcome')
})

Route.get('/names', async ({ response }) => {
  return response.status(201).view('names')
})
