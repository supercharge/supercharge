'use strict'

const BaseTest = util('base-test')

class BaseRoutesTest extends BaseTest {
  async startpage (t) {
    const response = await this.get('/')
    t.is(response.statusCode, 200)
  }

  async missing (t) {
    const response = await this.get('/404')
    t.is(response.statusCode, 404)
  }

  async js (t) {
    const response = await this.get('/js/app.js')
    t.is(response.statusCode, 200)
  }

  async css (t) {
    const response = await this.get('/css/style.css')
    t.is(response.statusCode, 200)
  }

  async images (t) {
    const response = await this.get('/images/logo.png')
    t.is(response.statusCode, 200)
  }

  async favicon (t) {
    const response = await this.get('/favicon.ico')
    t.is(response.statusCode, 200)
  }
}

module.exports = new BaseRoutesTest()
