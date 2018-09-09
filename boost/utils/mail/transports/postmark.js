'use strict'

const Nodemailer = require('nodemailer')
const PostmarkTransport = require('nodemailer-postmark-transport')

/**
 * Creates the Postmark transporter for Nodemailer
 * based on the application's configuration.
 */
class PostmarkTransporter {
  constructor (options) {
    return Nodemailer.createTransport(PostmarkTransport(options))
  }
}

module.exports = PostmarkTransporter
