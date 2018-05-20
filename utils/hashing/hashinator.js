'use strict'

const BcryptHashinator = require('./bcrypt-hashinator')
const ArgonHashinator = require('./argon-hashinator')

class Hash {
  constructor() {
    const driver = process.env.HASHING_DRIVER || 'bcrypt'

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
