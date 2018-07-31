'use strict'

const Nodemailer = require('nodemailer')
const MailgunTransport = require('nodemailer-mailgun-transport')

class MailgunTransporter {
  constructor(options) {
    return Nodemailer.createTransport(MailgunTransport(options))
  }
}

module.exports = MailgunTransporter
