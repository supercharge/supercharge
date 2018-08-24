'use strict'

/**
 * Export a list of all available Craft commands
 */
module.exports = {
  setup: require('./setup'),
  'app:name': require('./appName'),
  'key:generate': require('./keyGenerate')
}
