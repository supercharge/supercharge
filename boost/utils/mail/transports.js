'use strict'

module.exports = {
  ses: require('./transport-ses'),
  smtp: require('./transport-smtp'),
  mailgun: require('./transport-mailgun'),
  postmark: require('./transport-postmark'),
  sparkpost: require('./transport-sparkpost')
}
