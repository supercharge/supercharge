'use strict'

const Mailer = util('mailer')
const Logger = util('logger')
const Listener = util('Listener')
const WelcomeMail = mail('welcome')

class SendWelcomeMail extends Listener {
  on() {
    return 'user.registered'
  }

  async handle(event) {
    /**
     * TODO
     */
    // await Mailer.fireAndForget(new WelcomeMail(event.user))
  }
}

module.exports = SendWelcomeMail
