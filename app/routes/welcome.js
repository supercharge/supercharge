'use strict'

module.exports = {
  method: 'GET',
  path: '/',
  handler: (_, h) => h.view('welcome', null, { layout: 'clean' })
}
