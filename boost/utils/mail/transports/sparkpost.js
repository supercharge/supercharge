'use strict'

const Nodemailer = require('nodemailer')
const SparkpostTransport = require('nodemailer-sparkpost-transport')

/**
 * Creates the Sparkpost transporter for Nodemailer
 * based on the application's configuration.
 */
class SparkpostTransporter {
  constructor (options) {
    return Nodemailer.createTransport(SparkpostTransport(options))
  }
}

module.exports = SparkpostTransporter
