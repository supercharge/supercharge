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

  /**
   * Delete all users.
   */
  async deleteUsers () {
    // TODO wait for all users to be deleted
    User.remove().exec()
  }

  /**
   * Delete the given `user`.
   *
   * @param {Object} user
   *
   * @throws
   */
  async deleteUser ({ _id } = {}) {
    if (!_id) {
      throw new Error('Missing user ID. Pass a user object to "deleteUser(user)".')
    }

    await this.deleteUserById(_id)
  }

  /**
   * Delete a user identified by the given `id`.
   *
   * @param {String} id
   *
   * @throws
   */
  async deleteUserById (id) {
    if (!id) {
      throw new Error('Missing user ID. Pass an ID to "deleteUserById(id)".')
    }

    await User.findOneAndDelete({ _id: id })
  }
}

module.exports = CreatesFakeData
