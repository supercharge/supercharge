'use strict'

const User = model('user')
const Uuid = require('uuid/v4')

/**
 * This class provides methods to conveniently
 * provide fake data in the class methods,
 * like fake users.
 */
class CreatesFakeData {
  /**
   * Create a fake user instance without
   * saving it to the database.
   */
  fakeUser() {
    return new User({ email: `user-${Uuid()}@mail.com` })
  }
}

module.exports = CreatesFakeData
