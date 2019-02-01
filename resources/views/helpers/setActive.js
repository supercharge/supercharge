'use strict'

const _ = require('lodash')

/**
 * Returns the string "active"  if the `urlPath`
 * matches the current request path. Returns an
 * empty string if the values don't match.
 *
 * @returns {String}
 */
function setActive (urlPath, context) {
  const path = _.get(context, 'data.root.request.path')

  return path === urlPath ? 'active' : ''
}

module.exports = setActive
