'use strict'

const Nodemailer = require('nodemailer')
const AWS = require('aws-sdk')

/**
 * Creates the SES transporter for Nodemailer
 * based on the application's configuration.
 */
class SesTransporter {
  constructor (options) {
    return Nodemailer.createTransport({
      SES: new AWS.SES(options)
    })
  }
}

module.exports = SesTransporter
