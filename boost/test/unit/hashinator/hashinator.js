'use strict'

const Config = util('config')
const Hash = util('hashinator')
const BaseTest = util('base-test')

class HashinatorTest extends BaseTest {
  async makeHash (t) {
    const hash = await Hash.make('boost')
    t.truthy(hash)
  }

  async verifyHash (t) {
    const hash = await Hash.make('boost')
    t.true(await Hash.check('boost', hash))
  }

  async md5 (t) {
    const hash = await Hash.md5('boost')
    t.truthy(hash)
  }

  async selectHashinatorBasedOnConfig (t) {
    Config.set('hashing.driver', 'bcrypt')
    const BcryptHasher = new Hash.constructor()
    const bcryptHash = await BcryptHasher.make('boost')

    Config.set('hashing.driver', 'argon')
    const ArgonHasher = new Hash.constructor()
    const argonHash = await ArgonHasher.make('boost')

    t.not(bcryptHash, argonHash)
  }
}

module.exports = new HashinatorTest()
