'use strict'

const User = model('user')
const Uuid = require('uuid/v4')
const Hash = util('hashinator')
const Encrypter = util('encrypter')

/**
 * This class provides methods to conveniently
 * provide fake data in the class methods,
 * like fake users.
 */
class CreatesFakeData {
  /**
   * Create a fake user instance without
   * saving it to the database.
   *
   * @returns {Object}
   */
  async fakeUser ({ email, password, ...rest } = {}) {
    email = email || `testuser-${Uuid()}@boost.fs`
    password = password || this.randomKey()
    const resetToken = `reset-${this.randomKey()}`

    const created = new User({
      email,
      password,
      passwordResetToken: await Hash.make(resetToken),
      ...rest
    })

    await created.hashPassword()
    await created.save()

    return Object.assign(created, { passwordPlain: password, passwordResetTokenPlain: resetToken })
  }

  /**
   * Delete all users.
   */
  async deleteUsers () {
    await User.deleteMany().exec()
  }

  /**
   * Delete the given `user`.
   *
   * @param {Object} user
   *
   * @throws {Error}
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
   * @throws {Error}
   */
  async deleteUserById (id) {
    if (!id) {
      throw new Error('Missing user ID. Pass an ID to "deleteUserById(id)".')
    }

    await User.findOneAndDelete({ _id: id })
  }

  /**
   * Generates a random key.
   *
   * @returns {String}
   */
  randomKey (bytes) {
    return Encrypter.randomKey(bytes)
  }
}

module.exports = CreatesFakeData
