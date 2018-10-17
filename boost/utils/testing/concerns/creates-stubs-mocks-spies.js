'use strict'

const Sinon = require('sinon')

class CreatesStubsMocksSpies {
  sinon () {
    return Sinon
  }

  stub (...args) {
    return Sinon.stub(...args)
  }

  mock (...args) {
    return Sinon.mock(...args)
  }

  spy (...args) {
    return Sinon.spy(...args)
  }
}

module.exports = CreatesStubsMocksSpies
