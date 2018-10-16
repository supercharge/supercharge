'use strict'

/**
 * Creates a JSON string from the content parameter
 *
 * @returns String - JSON
 */
function json (content) {
  return JSON.stringify(content, undefined, 2)
}

module.exports = json
