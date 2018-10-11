'use strict'

const BaseTest = util('base-test')
const Hashinator = util('hashing/bcrypt-hashinator')

class BcryptHashinatorTest extends BaseTest {
  async makeBcryptHash (t) {
    const hasher = new Hashinator()
    t.truthy(await hasher.make('boost'))
  }

  async verifyBcryptHash (t) {
    const hasher = new Hashinator()
    const hash = await hasher.make('boost')
    t.true(await hasher.check('boost', hash))
  }
}

module.exports = new BcryptHashinatorTest()
