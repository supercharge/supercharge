'use strict'

const Env = require('@supercharge/framework/env')

module.exports = {
  /**
   * --------------------------------------------------------------------------
   * Default Mail Driver
   * --------------------------------------------------------------------------
   *
   * This defines the transport driver for sending emails. Supercharge
   * uses the `nodemailer` package to send emails and supports
   * basically any driver that is supported by nodemailer.
   *
   * Available drivers: `smtp`, `postmark`, `mailgun`, `sparkpost`, `ses`
   *
   */
  driver: Env.get('MAIL_DRIVER', 'smtp'),

  /**
   * --------------------------------------------------------------------------
   * Global "From" Address
   * --------------------------------------------------------------------------
   *
   * This defines an object to use as the default "from" address
   * when sending mails with Supercharge’s mailer. This global value
   * is used as the default "from" attribute.
   *
   */
  from: {
    address: Env.get('MAIL_FROM_ADDRESS', 'hello@example.com'),
    name: Env.get('MAIL_FROM_NAME', 'Example Name')
  },

  transports: {
    /**
     * --------------------------------------------------------------------------
     * SMTP
     * --------------------------------------------------------------------------
     *
     * This defines the SMTP connection details used by
     * nodemailer to send emails via this transport.
     * Adjust the settings to your needs.
     *
     */
    smtp: {
      host: Env.get('MAIL_SMTP_HOST'),
      port: Env.get('MAIL_SMTP_PORT', 587),
      auth: {
        user: Env.get('MAIL_SMTP_USERNAME'),
        pass: Env.get('MAIL_SMTP_PASSWORD')
      }
      // secure: true, // use TLS
      // proxy: '',
      // pool: true,
      // maxConnections: 5,
      // maxMessages: 100,
      // rateLimit: 10
    },

    /**
     * --------------------------------------------------------------------------
     * Postmark
     * --------------------------------------------------------------------------
     *
     * This defines the Postmark connection details used by
     * nodemailer to send emails via this transport.
     * Adjust the settings to your needs.
     *
     */
    postmark: {
      auth: {
        apiKey: Env.get('MAIL_POSTMARK_API_KEY')
      }
      // postmarkOptions: {}
    },

    /**
     * --------------------------------------------------------------------------
     * Mailgun
     * --------------------------------------------------------------------------
     *
     * This defines the Mailgun connection details used by
     * nodemailer to send emails via this transport.
     * Adjust the settings to your needs.
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
     *
     * This defines the Sparkpost connection details used by
     * nodemailer to send emails via this transport.
     * Adjust the settings to your needs.
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
      // campaign_id: 'Supercharge Campaign'
    },

    /**
     * --------------------------------------------------------------------------
     * SES
     * --------------------------------------------------------------------------
     *
     * This defines the SES connection details used by
     * nodemailer to send emails via this transport.
     * Adjust the settings to your needs.
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
