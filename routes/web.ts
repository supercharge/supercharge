/**
 * --------------------------------------------------------------------------
 * Routes
 * --------------------------------------------------------------------------
 *
 * Details and descriptions about this routes files and maybe about routing?
 *
 */

import Route from '@ioc:supercharge/route'

Route.get('/', 'DevController.index')

Route.get('/hi', () => {
  return JSON.stringify({
    id: 1, name: 'Marcus',
  })
})

Route.post('/', ctx => {
  return ctx.request.payload()
})

Route.get('/hi/:name', async ({ request, response }) => {
  response.payload(
    `Hey ${String(request.params().name)}`,
  )
})

Route.prefix('/names').group(() => {
  Route.get('/', () => {
    return ['Marcus', 'Norman', 'Christian']
  })

  Route.get('/:name', ({ request, response }) => {
    response.payload(`Hi ${String(request.params().name)}`)
  })
})
