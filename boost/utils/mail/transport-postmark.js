'use strict'

const Nodemailer = require('nodemailer')
const PostmarkTransport = require('nodemailer-postmark-transport')

class Transporter {
  constructor(options) {
    return Nodemailer.createTransport(PostmarkTransport(options))
  }
}

module.exports = Transporter
