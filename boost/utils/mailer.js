'use strict'

const Fs = require('fs')
const Path = require('path')
const Boom = require('boom')
const Util = require('util')
const Config = util('config')
const Bounce = require('bounce')
const Logger = require('./logger')
const Templates = resourcePath('emails')
const Handlebars = require('handlebars')
const Message = require('./mail/message')
const HtmlToText = require('html-to-text')
const ReadFile = Util.promisify(Fs.readFile)
const Transports = require('./mail/transports')

class Mailer {
  constructor() {
    const driver = Config.get('mail.driver')
    const drivers = Config.get('mail.drivers')
    const transporterOptions = drivers[driver]

    const Transporter = Transports[driver]
    this.transporter = new Transporter(transporterOptions)
  }

  to(users) {
    return new Message(this).to(users)
  }

  cc(users) {
    return new Message(this).cc(users)
  }

  bcc(users) {
    return new Message(this).bcc(users)
  }

  async send(mailable = {}) {
    const from = Config.get('mail.from')
    const { view, viewData, to, cc, bcc, subject } = mailable
    const { html, text } = await this._prepareTemplate(view, viewData)

    const message = {
      from,
      to,
      cc,
      bcc,
      subject,
      html,
      text
    }

    try {
      await this.transporter.sendMail(message)
    } catch (err) {
      Logger.error(err.message)
      throw err
    }
  }

  /**
   * Send an email and don’t worry
   * about success or failure
   */
  async fireAndForget(template, user, subject, data) {
    try {
      await this.send(template, user, subject, data)
    } catch (err) {
      // this catches application errors (we don’t care about)
      // and still throw system errors
      Bounce.rethrow(err, 'system')
    }
  }

  /**
   * filename: email template name, without ".html" file ending. Email templates are located within "resources/emails"
   * options: data which will be used to replace the placeholders within the template
   **/
  async _prepareTemplate(viewName, viewData) {
    try {
      const filename = viewName.split('.').join('/')
      console.log(filename)
      const templatePath = __viewsPath(`${filename}.hbs`)
      console.log(templatePath)
      const content = await ReadFile(templatePath, 'utf8')

      // use handlebars to render the email template
      // handlebars allows more complex templates with conditionals and nested objects, etc.
      // this way we have much more options to customize the templates based on given data
      const template = Handlebars.compile(content)
      const html = template(viewData)

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
}

module.exports = new Mailer()
