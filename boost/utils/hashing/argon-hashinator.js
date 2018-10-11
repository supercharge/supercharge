'use strict'

const Config = util('config')
const Argon = require('argon2')

class ArgonHashinator {
  /**
   * Create a new Argon hasher instance.
   */
  constructor () {
    const config = Config.get('hashing.argon')
    this.config = Object.assign({}, config, { type: Argon[Config.get('hashing.argon.type')] })
  }

  /**
   * Hash the given `value`.
   *
   * @param {String} value
   *
   * @returns {String}
   */
  async make (value) {
    return Argon.hash(value, this.config)
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
    return Argon.verify(hash, value)
  }
}

module.exports = ArgonHashinator
