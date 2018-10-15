'use strict'

const Fs = require('fs')
const _ = require('lodash')
const Util = require('util')
const HtmlToText = require('html-to-text')
const ReadFile = Util.promisify(Fs.readFile)
const Handlebars = frequire('start', 'views').handlebars()

class Mailable {
  /**
   * Initialize a new mailable instance.
   */
  constructor () {
    this.message = {}
  }

  /**
   * Every mailable needs to override the `create`
   * method. This default will force a custom
   * `create` method or it throws an error.
   */
  create () {
    throw new Error(`Make sure to implement the "create" method in your ${this.constructor.name} mailable.`)
  }

  /**
   * Set the recepients of this message.
   *
   * @param {String|Object|Array} address
   * @param {String} name
   */
  to (address, name) {
    this.setAddress('to', address, name)

    return this
  }

  /**
   * Set the sender of this message.
   *
   * @param {String|Object|Array} address
   * @param {String} name
   */
  from (address, name) {
    this.setAddress('from', address, name)

    return this
  }

  /**
   * Set the sender of this message.
   *
   * @param {String|Object|Array} address
   * @param {String} name
   */
  replyTo (address, name) {
    this.setAddress('replyTo', address, name)

    return this
  }

  /**
   * Set the recepients of this message.
   *
   * @param {String|Object|Array} address
   * @param {String} name
   */
  cc (address, name) {
    this.setAddress('cc', address, name)

    return this
  }

  /**
   * Set the recepients of this message.
   *
   * @param {String|Object|Array} address
   * @param {String} name
   */
  bcc (address, name) {
    this.setAddress('bcc', address, name)

    return this
  }

  /**
   * Set the subject line of this message.
   *
   * @param {String} subject
   */
  subject (subject) {
    this.message.subject = subject

    return this
  }

  /**
   * Set the HTML content of this message.
   *
   * @param {String} html
   */
  html (html) {
    this.message.html = html

    return this
  }

  /**
   * Set the path to the message view file.
   *
   * @param {String} view
   */
  view (view) {
    this.message.view = view

    return this
  }

  /**
   * Set the view data for this message.
   *
   * @param {String|Object} key
   * @param {String} value
   */
  with (key, value) {
    this.message.viewData = this.message.viewData || {}

    if (_.isObject(key)) {
      this.message.viewData = Object.assign({}, this.message.viewData, key)
    } else {
      this.message.viewData[key] = value
    }

    return this
  }

  /**
   * Build the message based on the instance data.
   *
   * @returns {Object}
   */
  async buildMessage () {
    await this.create()
    await this.render()

    return this.message
  }

  /**
   * Renders the message's content. Read and render
   * the HTML view and plain text.
   */
  async render () {
    this.message.html = await this.buildView()
    this.message.text = HtmlToText.fromString(this.message.html)
  }

  /**
   * Create the compiled and rendered message HTML.
   *
   * @param {String} viewName
   * @param {Object} viewData

   * @returns {String}
   */
  async buildView () {
    const template = this.message.view ? await this.readTemplate() : this.message.html
    const render = Handlebars.compile(template || '')

    return render(this.message.viewData)
  }

  /**
   * Read the content of the message view template.
   *
   * @param {String} viewName
   *
   * @returns {String}
   */
  async readTemplate () {
    return ReadFile(this.getTemplatePath(this.message.view), 'utf8')
  }

  /**
   * Resolve the path to this message's view template.
   *
   * @param {String} viewName
   *
   * @returns {String}
   */
  getTemplatePath () {
    const filename = this.message.view.split('.').join('/')

    return __viewsPath(`${filename}.hbs`)
  }

  /**
   * Assign address fields (to, from, replyTo) to the message.
   * This will always create an array of address objects. If
   * `address` is an array of objects, it will concat them.
   */
  setAddress (field, address, name) {
    this.message[field] = this.message[field] || []

    if (address instanceof Array) {
      this.message[field] = this.message[field].concat(address)
      return
    }

    const addressObject = name ? { address, name } : address
    this.message[field].push(addressObject)
  }
}

module.exports = Mailable
