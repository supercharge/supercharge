'use strict'

const Path = require('path')
const Bcrypt = require('bcryptjs')
const Config = require(Path.resolve(__dirname, '..', 'config'))

class BcryptHashinator {
  constructor() {
    this.rounds = Config.get('hashing.bcrypt.rounds') || 12
  }

  async make(value) {
    return Bcrypt.hash(value, this.rounds)
  }

  async check(value, hash) {
    return Bcrypt.compare(value, hash)
  }
}

module.exports = new BcryptHashinator()
