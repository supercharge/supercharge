'use strict'

/**
 * Barrel export all transports
 */
module.exports = {
  ses: require('./transports/ses'),
  smtp: require('./transports/smtp'),
  mailgun: require('./transports/mailgun'),
  postmark: require('./transports/postmark'),
  sparkpost: require('./transports/sparkpost')
}
