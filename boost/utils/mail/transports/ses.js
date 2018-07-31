'use strict'

const Nodemailer = require('nodemailer')
const AWS = require('aws-sdk')

class SesTransporter {
  constructor(options) {
    return Nodemailer.createTransport({
      SES: new AWS.SES(options)
    })
  }
}

module.exports = SesTransporter
