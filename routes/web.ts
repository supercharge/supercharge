/**
 * --------------------------------------------------------------------------
 * Routes
 * --------------------------------------------------------------------------
 *
 * Details and descriptions about this routes files and maybe about routing?
 *
 */

import Route from '@ioc:supercharge/route'

Route.get('/', ctx => {
  ctx.response.payload('Hey Vlad')
})

Route.post('/', ctx => {
  ctx.response.payload(
    ctx.request.payload(),
  )
})

Route.get('/hi/:name', async ({ request, response }) => {
  response.payload(
    `Hey ${String(request.params().name)}`,
  )
})

Route.prefix('/names').group(() => {
  const names = ['Marcus', 'Norman', 'Christian']

  Route.get('/', ({ response }) => {
    return response.payload(names)
  })

  Route.get('/:name', ({ request, response }) => {
    console.log('route handler -> ' + String(request.path()))

    response.payload(`Hi ${String(request.params().name)}`)
  })
})
