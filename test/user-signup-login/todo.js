'use strict'

const Lab = require('lab')

// Test files must require the lab module, and export a test script
const lab = (exports.lab = Lab.script())

// shortcuts to functions from lab
// let's make the tests look like BDD
const { describe, it } = lab

describe('getting started with hapi testing using lab,', () => {
  it.skip('lab considers this test as TODO and skips it')

  it('always succeeds :)', () => {})

  it('always succeeding with an increased timeout :)', { timeout: 5000 }, () => {})
})
