'use strict'

const MD5 = require('md5')
const Config = require('./config')
const ArgonHashinator = require('./hashing/argon-hashinator')
const BcryptHashinator = require('./hashing/bcrypt-hashinator')

class Hashinator {
  /**
   * Initialize the hashing driver.
   */
  constructor () {
    const driver = Config.get('hashing.driver')

    if (driver === 'argon') {
      this.driver = ArgonHashinator
      return
    }

    this.driver = BcryptHashinator
  }

  /**
   * Hash the `value` using the given driver.
   *
   * @param {String} value
   *
   * @returns {String}
   */
  async make (value) {
    return this.driver.make(value)
  }

  /**
   * Compare a the plain-text `value` against an
   * existing hash. The returned promise never
   * rejects and always returns a boolean value.
   *
   * @param {String} value
   * @param {String} hash
   *
   * @returns {Boolean}
   */
  async check (value, hash) {
    return this.driver.check(value, hash)
  }

  /**
   * Create an MD5 hash of the given `value`.
   *
   * @param {String|Buffer} value
   */
  md5 (value) {
    return MD5(value)
  }
}

module.exports = new Hashinator()
