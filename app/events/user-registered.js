'use strict'

const Event = util('event')

class UserRegistered extends Event {
  constructor(user) {
    super()
    this.user = user
  }

  emit() {
    return 'user.registered'
  }
}

module.exports = UserRegistered
