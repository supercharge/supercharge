'use strict'

const CacheClient = require('./cache-client')

class SearchCache extends CacheClient {
  constructor() {
    super()

    // cache segment, like a DB table for the cache results
    this.segment = 'search'
  }
}

module.exports = SearchCache
