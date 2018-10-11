'use strict'

const Nodemailer = require('nodemailer')

/**
 * Creates the SMTP transporter for Nodemailer
 * based on the application's configuration.
 */
class SmtpTransporter {
  constructor (options = {}) {
    return Nodemailer.createTransport(options)
  }
}

module.exports = SmtpTransporter
