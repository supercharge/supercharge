'use strict'

const Path = require('path')
const Mailable = util('mailable')
const BaseTest = util('base-test')
const MissingCreateMailable = require('./fixtures/missing-create-mailable')

class MailableTest extends BaseTest {
  _getTemplatePath (viewName) {
    const filename = viewName.split('.').join('/')

    return Path.resolve(__dirname, 'fixtures', 'views', `${filename}.hbs`)
  }

  async throwsWithoutCreateMethod (t) {
    const mailable = new MissingCreateMailable()
    const error = await t.throwsAsync(mailable.buildMessage())
    t.true(error.message.includes('Make sure to implement the "create" method '))
    t.true(error.message.includes('MissingCreateMailable'))
  }

  async setAddressAsArray (t) {
    const cc = ['marcus@futurestud.io', 'norman@futurestud.io', 'christian@futurestud.io']
    const mailable = new Mailable()
    mailable.setAddress('cc', cc)
    t.deepEqual(mailable.message.cc, cc)
  }

  async setAddressWithNameAndAddress (t) {
    const mailable = new Mailable()
    mailable.setAddress('cc', 'marcus@futurestud.io', 'Marcus')
    t.deepEqual(mailable.message.cc, [{ name: 'Marcus', address: 'marcus@futurestud.io' }])
  }

  async setAddressWithAddress (t) {
    const mailable = new Mailable()
    mailable.setAddress('cc', 'marcus@futurestud.io')
    t.deepEqual(mailable.message.cc, [ 'marcus@futurestud.io' ])
  }

  async withSubject (t) {
    const mailable = new Mailable().subject('Test Mail')
    t.is(mailable.message.subject, 'Test Mail')
  }

  async chainable (t) {
    const mailable = new Mailable().to('marcus@futurestud.io').subject('Test Mail')
    t.is(mailable.message.subject, 'Test Mail')
  }

  async getTemplatePath (t) {
    const mailable = new Mailable().view('mail.test.view')
    const path = mailable.getTemplatePath()

    /**
     * Path representations change between operating systems.
     * That's why we assert on the positions where 'mail' comes
     * first, 'test' second, and 'view' third.
     */
    t.true(path.indexOf('mail') < path.indexOf('test') < path.indexOf('view'))
  }

  async readTemplate (t) {
    const mailable = new Mailable().view('test-mail')
    mailable.getTemplatePath = this._getTemplatePath

    const content = await mailable.readTemplate()

    t.true(content.includes('Hello Mailer'))
  }

  async render (t) {
    const mailable = new Mailable().view('test-mail').with('name', 'Marcus')
    mailable.getTemplatePath = this._getTemplatePath
    await mailable.render()
    t.true(mailable.message.html.includes('Hello Mailer Marcus'))
  }

  async renderHtml (t) {
    const mailable = new Mailable().html('<h1>Testing Mailable {{name}}</h1>').with({ name: 'Marcus' })
    await mailable.render()
    t.true(mailable.message.html.includes('Testing Mailable Marcus'))
  }
}

module.exports = new MailableTest()
