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
   * Available drivers: `smtp`, `postmark`, `mailgun`, `sparkpost`, `ses`
   *
   * Basically any driver that nodemailer supports
   *
   */
  driver: Env.get('MAIL_DRIVER', 'smtp'),

  /**
   * --------------------------------------------------------------------------
   * Global "From" Address
   * --------------------------------------------------------------------------
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
     * --------------------------------------------------------------------------
     * SMTP
     * --------------------------------------------------------------------------
     *
     * Tbd.
     *
     */
    smtp: {
      pool: true,
      host: Env.get('MAIL_SMTP_HOST'),
      port: Env.get('MAIL_SMTP_PORT', 587),
      auth: {
        user: Env.get('MAIL_SMTP_USERNAME'),
        pass: Env.get('MAIL_SMTP_PASSWORD')
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
        apiKey: Env.get('MAIL_POSTMARK_API_KEY')
      },
      postmarkOptions: {}
    },

    /**
     * --------------------------------------------------------------------------
     * Mailgun
     * --------------------------------------------------------------------------
     * Tbd.
     *
     */
    mailgun: {
      auth: {
        api_key: Env.get('MAIL_MAILGUN_API_KEY'),
        domain: Env.get('MAIL_MAILGUN_DOMAIN')
      }
      // proxy: Env.get('MAIL_MAILGUN_PROXY') // optional proxy, defaults to false
    },

    /**
     * --------------------------------------------------------------------------
     * Sparkpost
     * --------------------------------------------------------------------------
     * Tbd.
     *
     */
    sparkpost: {
      sparkPostApiKey: Env.get('MAIL_SPARKPOST_API_KEY')
      // endpoint: Env.get('MAIL_SPARKPOST_ENDPOINT')
      // metadata: {}
      // options: {
      //   open_tracking: true,
      //   click_tracking: true,
      //   transactional: true
      // },
      // campaign_id: 'Boost Campaign'
    },

    /**
     * --------------------------------------------------------------------------
     * SES
     * --------------------------------------------------------------------------
     * Tbd.
     *
     */
    ses: {
      apiVersion: Env.get('MAIL_SES_API_VERSION', '2010-12-01'),
      accessKeyId: Env.get('MAIL_SES_API_KEY'),
      secretAccessKey: Env.get('MAIL_SES_SECRET')
      // region: Env.get('MAIL_SES_REGION')
    }
  }
}
