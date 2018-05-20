'use strict'

const Bcrypt = require('bcryptjs')

class BcryptHashinator {
  constructor() {
    this.rounds = process.env.HASHING_BCRYPT_ROUNDS || 12
  }

  async make(value) {
    return Bcrypt.hash(value, this.rounds)
  }

  async check(value, hash) {
    return Bcrypt.compare(value, hash)
  }
}

module.exports = new BcryptHashinator()
