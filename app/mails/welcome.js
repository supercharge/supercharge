'use strict'

const Config = require('@supercharge/framework/config')
const Mailable = require('@supercharge/framework/mailer/mailable')

class WelcomeMail extends Mailable {
  constructor (user) {
    super()
    this.user = user
  }

  create () {
    this.to(this.user.email)
      .view('emails.welcome')
      .subject(`Welcome to ${Config.get('app.name')}!`)
      .with('name', this.user.name || this.user.username || this.user.email)
  }
}

module.exports = WelcomeMail
