'use strict'

const Nodemailer = require('nodemailer')

class SmtpTransporter {
  constructor(options) {
    return Nodemailer.createTransport(options)
  }
}

module.exports = SmtpTransporter
