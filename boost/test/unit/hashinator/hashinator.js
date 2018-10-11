'use strict'

const BaseTest = util('base-test')
const Hashinator = util('hashinator')

class HashinatorTest extends BaseTest {
  async makeHash (t) {
    const hash = await Hashinator.make('boost')
    t.truthy(hash)
  }

  async verifyHash (t) {
    const hash = await Hashinator.make('boost')
    t.true(await Hashinator.check('boost', hash))
  }

  async md5 (t) {
    const hash = await Hashinator.md5('boost')
    t.truthy(hash)
  }
}

module.exports = new HashinatorTest()
