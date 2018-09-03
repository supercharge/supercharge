'use strict'

const Ava = require('ava')
const _ = require('lodash')
const Path = require('path')
const Globals = require('./../start/globals')

class TestRunner {
  constructor() {
    new Globals().fromAppRoot(Path.resolve(__dirname, '..'))

    this.methods()
      .filter(this.shouldInclude, this)
      .map(method => {
        const name = _.chain(method)
          .kebabCase(method)
          .replace('-', ' ')
          .value()

        return Ava(name, t => {
          return this[method](t, Ava)
        })
      })
  }

  methods() {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this))
  }

  shouldInclude(property) {
    return !this.filter().includes(property)
  }

  filter() {
    return ['constructor']
  }
}

module.exports = TestRunner
