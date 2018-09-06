'use strict'

/**
 * Barrel export all transports
 */
module.exports = {
  ses: require('./ses'),
  smtp: require('./smtp'),
  mailgun: require('./mailgun'),
  postmark: require('./postmark'),
  sparkpost: require('./sparkpost')
}
