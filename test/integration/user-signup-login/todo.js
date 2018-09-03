'use strict'

const BaseTest = require('../../base-test')

class LoginTest extends BaseTest {
  async beforeEach() {
    console.log('is this before everything else?')
  }

  async showLogin(t) {
    console.log('login')
    await new Promise(resolve => setTimeout(resolve, 1000))
    t.fail()
  }

  async bar(t) {
    console.log('bar')
    const bar = Promise.resolve('bar')
    await new Promise(resolve => setTimeout(resolve, 500))
    t.is(await bar, 'bar')
  }

  async after() {
    console.log('is this before everything else?')
  }
}

module.exports = new LoginTest()
