'use strict'

const Event = util('event')

class UserRegistered extends Event {
  constructor(user) {
    super()
    this.user = user
  }

  emits() {
    return 'user.registered'
  }
}

module.exports = UserRegistered
