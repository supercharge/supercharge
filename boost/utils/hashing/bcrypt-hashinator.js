'use strict'

const Config = util('config')
const Bcrypt = require('bcryptjs')

class BcryptHashinator {
  /**
   * Create a new Bcrypt hasher instance.
   */
  constructor () {
    this.rounds = parseInt(Config.get('hashing.bcrypt.rounds'))
  }

  /**
   * Hash the given `value`.
   *
   * @param {String} value
   *
   * @returns {String}
   */
  async make (value) {
    return Bcrypt.hash(value, this.rounds)
  }

  /**
   * Compare a the plain-text `value` against an
   * existing hash.
   *
   * @param {String} value
   * @param {String} hash
   *
   * @returns {Boolean}
   */
  async check (value, hash) {
    return Bcrypt.compare(value, hash)
  }
}

module.exports = BcryptHashinator
