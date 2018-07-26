'use strict'

const Config = util('config')
const Bcrypt = require('bcryptjs')

class BcryptHashinator {
  constructor() {
    this.rounds = Config.get('hashing.bcrypt.rounds')
  }

  async make(value) {
    return Bcrypt.hash(value, this.rounds)
  }

  async check(value, hash) {
    return Bcrypt.compare(value, hash)
  }
}

module.exports = new BcryptHashinator()
