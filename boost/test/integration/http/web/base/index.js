'use strict'

const Path = require('path')
const Fs = require('fs-extra')
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

  async javascript (t) {
    const file = Path.resolve(__appRoot, 'public', 'js', 'testfile.js')
    await Fs.ensureFile(file)

    const response = await this.get('/js/testfile.js')
    t.is(response.statusCode, 200)

    await Fs.remove(file)
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
