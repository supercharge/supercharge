'use strict'

const BaseTest = util('base-test')

class JsonHelperTest extends BaseTest {
  async jsonHelper (t) {
    const data = { name: 'Marcus' }
    const output = await this.render(`{{json data}}`, { data })
    t.is(output, JSON.stringify(data, null, 2))
  }
}

module.exports = new JsonHelperTest()
