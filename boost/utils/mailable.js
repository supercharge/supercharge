'use strict'

const _ = require('lodash')

class Mailable {
  build() {
    throw new Error(`Make sure to implement the "build" method in your ${this.constructor.name} mailable`)
  }

  view(view) {
    this.view = view

    return this
  }

  text(textView) {
    this.textView = textView

    return this
  }

  subject(subject) {
    this.subject = subject

    return this
  }

  with(key, value) {
    if (_.isObject(key)) {
      this.viewData = Object.assign(this.viewData, key)
    } else {
      this.viewData[key] = value
    }

    return this
  }

  send(mailable) {
    return this.mailer.send(mailable)
  }
}

module.exports = Mailable
