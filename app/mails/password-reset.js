'use strict'

const Config = require('@supercharge/framework/config')
const Mailable = require('@supercharge/framework/mailer/mailable')

class PasswordResetMail extends Mailable {
  constructor ({ user, resetURL }) {
    super()
    this.user = user
    this.resetURL = resetURL
  }

  create () {
    this.to(this.user.email)
      .view('emails.password-reset')
      .subject(`${Config.get('app.name')} - Password Reset`)
      .with('resetURL', this.resetURL)
  }
}

module.exports = PasswordResetMail
