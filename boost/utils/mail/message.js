'use strict'

class Message {
  constructor(mailer) {
    this.mailer = mailer
  }

  to(users) {
    this.to = users

    return this
  }

  cc(users) {
    this.cc = users

    return this
  }

  bcc(users) {
    this.bcc = users

    return this
  }

  send(mailable) {
    return this.mailer.send(mailable)
  }
}

module.exports = Message
