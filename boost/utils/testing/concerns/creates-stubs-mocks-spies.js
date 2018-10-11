'use strict'

const Sinon = require('sinon')

class CreatesStubsMocksSpies {
  sinon () {
    return Sinon
  }

  restore () {
    return Sinon.restore()
  }

  defaultConfig () {
    return Sinon.defaultConfig
  }

  assert (...args) {
    return Sinon.assert(...args)
  }

  clock (...args) {
    return Sinon.clock(...args)
  }

  createSandbox (...args) {
    return Sinon.createSandbox(...args)
  }

  stub (...args) {
    return Sinon.stub(...args)
  }

  createStubInstance (...args) {
    return Sinon.createStubInstance(...args)
  }

  mock (...args) {
    return Sinon.mock(...args)
  }

  spy (...args) {
    return Sinon.spy(...args)
  }

  spyCall (...args) {
    return Sinon.spyCall(...args)
  }

  fake (...args) {
    return Sinon.fake(...args)
  }

  fakeServer (...args) {
    return Sinon.fakeServer(...args)
  }

  fakeServerWithClock (...args) {
    return Sinon.fakeServerWithClock(...args)
  }

  useFakeTimers (...args) {
    return Sinon.useFakeTimers(...args)
  }

  match (...args) {
    return Sinon.match(...args)
  }

  expectation (...args) {
    return Sinon.expectation(...args)
  }
}

module.exports = CreatesStubsMocksSpies
