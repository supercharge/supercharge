'use strict'

const User = model('user')
const Uuid = require('uuid/v4')
const Encryptor = util('encryptor')

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
  async fakeUser ({ email, ...rest } = {}) {
    email = email || `testuser-${Uuid()}@boost.fs`
    const password = Encryptor.randomKey()

    const created = new User({ email, password, ...rest })
    await created.hashPassword()
    await created.save()

    return Object.assign(created, { passwordPlain: password })
  }

  async deleteUser ({ _id }) {
    await this.deleteUserById(_id)
  }

  async deleteUserById (id) {
    await User.findOneAndDelete({ _id: id })
  }
}

module.exports = CreatesFakeData
