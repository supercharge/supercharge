'use strict'

const Handlebars = require('handlebars')

/**
 * Creates a JSON string from the content parameter.
 *
 * @returns {String} JSON
 */
function json (content) {
  return new Handlebars.SafeString(JSON.stringify(content, undefined, 2))
}

module.exports = json
