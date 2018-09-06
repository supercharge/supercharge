'use strict'

const User = model('user')
const Uuid = require('uuid/v4')

class CreatesFakeData {
  fakeUser() {
    return new User({ email: `user-${Uuid()}@mail.com` })
  }
}

module.exports = CreatesFakeData
