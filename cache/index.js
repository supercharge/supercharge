'use strict'

const Path = require('path')
const Search = require('./search-cache')
const Logger = require(Path.resolve(__dirname, '..', 'utils', 'logger'))

const SearchCache = new Search()

async function start() {
  try {
    await Promise.all([SearchCache.start()])

    Logger.info('All cache clients ready')
  } catch (err) {
    throw new Error(`Failed to start all caches → ${err.message}`)
  }
}

module.exports = {
  start,
  SearchCache
}
