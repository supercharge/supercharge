'use strict'

const Nodemailer = require('nodemailer')
const SparkpostTransport = require('nodemailer-sparkpost-transport')

class SparkpostTransporter {
  constructor(options) {
    return Nodemailer.createTransport(SparkpostTransport(options))
  }
}

module.exports = SparkpostTransporter
