'use strict'

/**
 * Returns the string "active"  if the `urlPath`
 * matches the current request path. Returns an
 * empty string if the values don't match.
 *
 * @returns {String}
 */
function setActive (urlPath, context) {
  return context.data.root.request.path === urlPath ? 'active' : ''
}

module.exports = setActive
