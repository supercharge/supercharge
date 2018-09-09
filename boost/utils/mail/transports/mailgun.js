'use strict'

const Nodemailer = require('nodemailer')
const MailgunTransport = require('nodemailer-mailgun-transport')

/**
 * Creates the Mailgun transporter for Nodemailer
 * based on the application's configuration.
 */
class MailgunTransporter {
  constructor (options) {
    return Nodemailer.createTransport(MailgunTransport(options))
  }
}

module.exports = MailgunTransporter
