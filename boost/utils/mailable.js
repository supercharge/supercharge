'use strict'

const Fs = require('fs')
const _ = require('lodash')
const Util = require('util')
const HtmlToText = require('html-to-text')
const ReadFile = Util.promisify(Fs.readFile)
const Handlebars = frequire('start', 'views').engines.hbs

class Mailable {
  constructor() {
    this.message = {}
  }

  create() {
    throw new Error(`Make sure to implement the "build" method in your ${this.constructor.name} mailable`)
  }

  to(address, name) {
    this.setAddress('to', address, name)

    return this
  }

  from(address, name) {
    this.setAddress('from', address, name)

    return this
  }

  replyTo(address, name) {
    this.setAddress('replyTo', address, name)

    return this
  }

  subject(subject) {
    this.message.subject = subject

    return this
  }

  html(html) {
    this.message.html = html

    return this
  }

  view(view) {
    this.view = view

    return this
  }

  text(textView) {
    this.textView = textView

    return this
  }

  with(key, value) {
    this.viewData = this.viewData || {}

    if (_.isObject(key)) {
      this.viewData = Object.assign({}, this.viewData, key)
    } else {
      this.viewData[key] = value
    }

    return this
  }

  async buildMessage() {
    this.create()
    await this.render()

    return this.message
  }

  async render() {
    this.message.html = await this.createHtml(this.view, this.viewData)

    if (!this.textView) {
      this.message.text = HtmlToText.fromString(this.html)
    }
  }

  async createHtml(viewName, viewData) {
    const template = await this.readTemplate(viewName)
    const render = Handlebars.compile(template)

    return render(viewData)
  }

  async readTemplate(viewName) {
    return ReadFile(this.getTemplatePath(viewName), 'utf8')
  }

  getTemplatePath(viewName) {
    const filename = viewName.split('.').join('/')

    return __viewsPath(`${filename}.hbs`)
  }

  /**
   * Assign address fields (to, from, replyTo) to the message.
   * This will always create an array of address objects. If
   * `address` is an array of objects, it will concat them.
   */
  setAddress(field, address, name) {
    this.message[field] = this.message[field] || []

    if (address instanceof Array === true) {
      this.message[field] = this.message[field].concat(address)
      return
    }

    const addressObject = name ? { address, name } : address
    this.message[field].push(addressObject)
  }
}

module.exports = Mailable
