'use strict'

const BaseTest = util('base-test')
const Hashinator = util('hashing/argon-hashinator')

class ArgonHashinatorTest extends BaseTest {
  async makeArgonHash (t) {
    const hasher = new Hashinator()
    t.truthy(await hasher.make('boost'))
  }

  async verifyArgonHash (t) {
    const hasher = new Hashinator()
    const hash = await hasher.make('boost')
    t.true(await hasher.check('boost', hash))
  }
}

module.exports = new ArgonHashinatorTest()
