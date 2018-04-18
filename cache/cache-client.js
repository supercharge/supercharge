'use strict'

const Catbox = require('catbox')
const CatboxMongoDB = require('catbox-mongodb')

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365

class CacheClient {
  constructor() {
    const options = {
      uri: process.env.CACHE_DATABASE_URI,
      partition: 'boost-cache'
    }

    this.cache = new Catbox.Client(CatboxMongoDB, options)
  }

  async start() {
    await this.cache.start()
  }

  async get(key) {
    const cached = await this.cache.get({ id: key, segment: this.segment })

    if (cached) {
      return cached.item
    }
  }

  async set(key, value, ttl) {
    return this.cache.set({ id: key, segment: this.segment }, value, ttl)
  }

  async forever(key, value) {
    return this.set(key, value, ONE_YEAR)
  }
}

module.exports = CacheClient
