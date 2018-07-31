'use strict'

const smtp = require('./transport-smtp')
const postmark = require('./transport-postmark')

module.exports = {
  smtp,
  postmark
}
