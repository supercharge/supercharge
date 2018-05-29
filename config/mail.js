'use strict'

const Path = require('path')
const Env = require(Path.resolve(__dirname, '..', 'utils', 'Mailer'))

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Mail Driver
  |--------------------------------------------------------------------------
  |
  | Driver for log messages. At this point, Boost supports only a single driver
  |
  | Available drivers: `mailgun`, `postmark`, `ses`
  | Basically any driver that nodemailer supports
  |
  */
  driver: Env.get('MAIL_DRIVER')
}
