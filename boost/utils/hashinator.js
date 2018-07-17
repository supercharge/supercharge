'use strict'

const Config = require('./config')
const ArgonHashinator = require('./hashing/argon-hashinator')
const BcryptHashinator = require('./hashing/bcrypt-hashinator')

class Hash {
  constructor() {
    const driver = Config.get('hashing.driver')

    if (driver === 'argon') {
      this.driver = ArgonHashinator
      return
    }

    this.driver = BcryptHashinator
  }

  async make(value) {
    return this.driver.make(value)
  }

  async check(value, hash) {
    if (!hash) {
      return false
    }

    return this.driver.check(value, hash)
  }
}

module.exports = new Hash()
