'use strict'

const Fs = require('fs')
const Path = require('path')
const Boom = require('boom')
const Util = require('util')
const Bounce = require('bounce')
const Nodemailer = require('nodemailer')
const Handlebars = require('handlebars')
const HtmlToText = require('html-to-text')
const ReadFile = Util.promisify(Fs.readFile)
const Logger = require(Path.resolve(__dirname, 'logger'))
const PostmarkTransport = require('nodemailer-postmark-transport')
const Transporter = Nodemailer.createTransport(
  PostmarkTransport({
    auth: {
      apiKey: process.env.POSTMARK_API_KEY
    }
  })
)
const Templates = Path.resolve(__dirname, '..', 'public', 'email-templates')

/**
 * filename: email template name, without ".html" file ending. Email templates are located within "web/email-templates"
 * options: data which will be used to replace the placeholders within the template
 **/
async function prepareTemplate(filename, options = {}) {
  try {
    const templatePath = Path.resolve(Templates, `${filename}.html`)
    const content = await ReadFile(templatePath, 'utf8')

    // use handlebars to render the email template
    // handlebars allows more complex templates with conditionals and nested objects, etc.
    // this way we have much more options to customize the templates based on given data
    const template = Handlebars.compile(content)
    const html = template(options)

    // generate a plain-text version of the same email
    const text = HtmlToText.fromString(html)

    return {
      html,
      text
    }
  } catch (error) {
    throw new Boom('Cannot read the email template content.')
  }
}

/**
 * Send an email using Nodemailer
 *
 * @param {String} template the template name which will be used to render an HTML mail
 * @param {Object} user     the user model, required for the recipient
 * @param {String} subject  subject line
 * @param {Object} data     view specific data that will be rendered into the view
 *
 * @throws
 */
async function send(template, user, subject, data) {
  const { html, text } = await prepareTemplate(template, data)
  const mailOptions = {
    from: `Marcus Poehls <marcus@futurestud.io>`,
    to: user.email,
    subject: subject,
    html,
    text
  }

  try {
    await Transporter.sendMail(mailOptions)
  } catch (err) {
    Logger.error(err.message)
    throw err
  }
}

/**
 * Send an email and don’t worry
 * about success or failure
 */
async function fireAndForget(template, user, subject, data) {
  try {
    await send(template, user, subject, data)
  } catch (err) {
    // this catches application errors (we don’t care about)
    // and still throw system errors
    Bounce.rethrow(err, 'system')
  }
}

exports.send = send
exports.fireAndForget = fireAndForget
