'use strict'

module.exports = {
  method: 'GET',
  path: '/{path*}',
  handler: (_, h) => h.view('errors/404').code(404)
}
