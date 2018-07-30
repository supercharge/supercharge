'use strict'

const Env = util('env')

module.exports = {
  /**
   * --------------------------------------------------------------------------
   * Default Mail Driver
   * --------------------------------------------------------------------------
   *
   * Driver for email sending.
   *
   * Available drivers: `mailgun`, `postmark`, `ses`
   * Basically any driver that nodemailer supports
   *
   */
  driver: Env.get('MAIL_DRIVER', 'smtp'),

  /**
   *--------------------------------------------------------------------------
   * Global "From" Address
   *--------------------------------------------------------------------------
   *
   * You may wish for all e-mails sent by your application to be sent from
   * the same address. Here, you may specify a name and address that is
   * used globally for all e-mails that are sent by your application.
   *
   */
  from: {
    address: Env.get('MAIL_FROM_ADDRESS', 'hello@example.com'),
    name: Env.get('MAIL_FROM_NAME', 'Example')
  },

  drivers: {
    /**
     * SMTP
     *
     * Tbd.
     *
     */
    smtp: {
      pool: true,
      port: 2525,
      host: Env.get('SMTP_HOST'),
      secure: false,
      auth: {
        user: Env.get('MAIL_USERNAME'),
        pass: Env.get('MAIL_PASSWORD')
      },
      maxConnections: 5,
      maxMessages: 100,
      rateLimit: 10
    },

    /**
     * --------------------------------------------------------------------------
     * Postmark
     * --------------------------------------------------------------------------
     * Tbd.
     *
     */
    postmark: {
      auth: {
        apiKey: Env.get('POSTMARK_API_KEY')
      },
      postmarkOptions: {}
    }
  }
}
