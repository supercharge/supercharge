'use strict'

const BaseTest = util('base-test')

class SetActiveHelperTest extends BaseTest {
  async setActiveForMatchingUrl (t) {
    const output = await this.render('{{setActive "/testing"}}', { request: { path: '/testing' } })
    t.is(output, 'active')
  }

  async notActiveForDifferentRequestUrl (t) {
    const output = await this.render('{{setActive "/testing"}}', { request: { path: '/home' } })
    t.is(output, '')
  }
}

module.exports = new SetActiveHelperTest()
