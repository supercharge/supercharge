'use strict'

const Argon = require('argon2')

class BcryptHashinator {
  constructor() {
    this.memory = process.env.HASHING_ARGON_MEMORY || 1024
    this.time = process.env.HASHING_ARGON_TIME || 2
    this.threads = process.env.HASHING_ARGON_THREADS || 2
  }

  async make(value) {
    return Argon.hash(value, {
      timeCost: this.time,
      memoryCost: this.memory,
      parallelism: this.threads
    })
  }

  async check(value, hash) {
    return Argon.verify(value, hash)
  }
}

module.exports = new BcryptHashinator()
