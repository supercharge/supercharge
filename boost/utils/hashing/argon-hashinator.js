'use strict'

const Config = util('config')
const Argon = require('argon2')

class BcryptHashinator {
  constructor () {
    this.memory = Config.get('hashing.argon.memory')
    this.time = Config.get('hashing.argon.time')
    this.threads = Config.get('hashing.argon.threads')
  }

  /**
   * Hash the given `value`.
   *
   * @param {String} value
   *
   * @returns {String}
   */
  async make (value) {
    return Argon.hash(value, {
      timeCost: this.time,
      memoryCost: this.memory,
      parallelism: this.threads
    })
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
    return Argon.verify(value, hash)
  }
}

module.exports = new BcryptHashinator()
