'use strict'

const BaseTest = util('base-test')
const Encrypter = util('encrypter')

class EncrypterTest extends BaseTest {
  async encryptString (t) {
    const encrypter = new Encrypter('a'.repeat(32))
    const encrypted = encrypter.encrypt('boost')
    t.not(encrypted, 'boost')
    t.is(encrypter.decrypt(encrypted), 'boost')
  }

  async encryptObject (t) {
    const encrypter = new Encrypter('a'.repeat(32))
    const encrypted = encrypter.encrypt({ boost: 'is awesome' })
    t.not(encrypted, 'boost')
    t.deepEqual(encrypter.decrypt(encrypted), { boost: 'is awesome' })
  }

  async generateKeyForAES128 (t) {
    const key = Encrypter.generateKey('AES-128-CBC')
    t.truthy(key)
    t.is(key.length, 16)
  }

  async generateKeyForAES256 (t) {
    const key = Encrypter.generateKey('AES-256-CBC')
    t.truthy(key)
    t.is(key.length, 32)
  }

  async generateKeyForRandomCipher (t) {
    const key = Encrypter.generateKey('RANDOM-CIPHER')
    t.truthy(key)
    t.is(key.length, 32)
  }

  async generateKey (t) {
    const key = Encrypter.generateKey()
    t.truthy(key)
    t.is(key.length, 32)
  }

  async randomKey (t) {
    const key = Encrypter.randomKey(16)
    t.truthy(key)
    t.is(key.length, 16)
  }

  async getKey (t) {
    const encrypter = new Encrypter('a'.repeat(32))
    const key = encrypter.getKey()
    t.is(key, 'a'.repeat(32))
  }

  async hmac (t) {
    const encrypter = new Encrypter('a'.repeat(32))
    const hmac = encrypter.hmac('boost is awesome')
    t.not(hmac, null)
  }

  async base64EncodeString (t) {
    const encrypter = new Encrypter('a'.repeat(32))
    const encoded = encrypter.base64Encode('boost is awesome')
    t.deepEqual(encrypter.base64Decode(encoded), 'boost is awesome')
  }

  async base64EncodeBuffer (t) {
    const encrypter = new Encrypter('a'.repeat(32))
    const encoded = encrypter.base64Encode(Buffer.from('boost is awesome'))
    t.deepEqual(encrypter.base64Decode(encoded), 'boost is awesome')
  }

  async base64DecodeBuffer (t) {
    const encrypter = new Encrypter('a'.repeat(32))
    const encoded = encrypter.base64Encode(Buffer.from('boost is awesome'))
    t.deepEqual(encrypter.base64Decode(Buffer.from(encoded, 'base64')), 'boost is awesome')
  }

  async failsWithoutEncryptionKey (t) {
    t.throws(() => new Encrypter(null))
  }

  async usesAppKeyAsEncryptionKey (t) {
    t.truthy(new Encrypter())
  }

  async failsWithTooShortEncryptionKey (t) {
    t.throws(() => new Encrypter('a'.repeat(5)))
  }
}

module.exports = new EncrypterTest()
