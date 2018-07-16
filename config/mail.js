'use strict'

const Env = util('env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Mail Driver
  |--------------------------------------------------------------------------
  |
  | Driver for email sending.
  |
  | Available drivers: `mailgun`, `postmark`, `ses`
  | Basically any driver that nodemailer supports
  |
  */
  driver: Env.get('MAIL_DRIVER', 'smtp')
}
