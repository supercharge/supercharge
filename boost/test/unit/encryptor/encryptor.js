'use strict'

const BaseTest = util('base-test')
const Encryptor = util('encryptor')

class EncryptorTest extends BaseTest {
  async encryptString (t) {
    const encryptor = new Encryptor('a'.repeat(32))
    const encrypted = encryptor.encrypt('boost')
    t.not(encrypted, 'boost')
    t.is(encryptor.decrypt(encrypted), 'boost')
  }

  async encryptObject (t) {
    const encryptor = new Encryptor('a'.repeat(32))
    const encrypted = encryptor.encrypt({ boost: 'is awesome' })
    t.not(encrypted, 'boost')
    t.deepEqual(encryptor.decrypt(encrypted), { boost: 'is awesome' })
  }

  async generateKeyForAES128 (t) {
    const key = Encryptor.generateKey('AES-128-CBC')
    t.truthy(key)
    t.is(key.length, 16)
  }

  async generateKeyForAES256 (t) {
    const key = Encryptor.generateKey('AES-256-CBC')
    t.truthy(key)
    t.is(key.length, 32)
  }

  async generateKeyForRandomCipher (t) {
    const key = Encryptor.generateKey('RANDOM-CIPHER')
    t.truthy(key)
    t.is(key.length, 32)
  }

  async generateKey (t) {
    const key = Encryptor.generateKey()
    t.truthy(key)
    t.is(key.length, 32)
  }

  async randomKey (t) {
    const key = Encryptor.randomKey(16)
    t.truthy(key)
    t.is(key.length, 16)
  }

  async getKey (t) {
    const encryptor = new Encryptor('a'.repeat(32))
    const key = encryptor.getKey()
    t.is(key, 'a'.repeat(32))
  }

  async hmac (t) {
    const encryptor = new Encryptor('a'.repeat(32))
    const hmac = encryptor.hmac('boost is awesome')
    t.not(hmac, null)
  }

  async base64EncodeString (t) {
    const encryptor = new Encryptor('a'.repeat(32))
    const encoded = encryptor.base64Encode('boost is awesome')
    t.deepEqual(encryptor.base64Decode(encoded), 'boost is awesome')
  }

  async base64EncodeBuffer (t) {
    const encryptor = new Encryptor('a'.repeat(32))
    const encoded = encryptor.base64Encode(Buffer.from('boost is awesome'))
    t.deepEqual(encryptor.base64Decode(encoded), 'boost is awesome')
  }

  async base64DecodeBuffer (t) {
    const encryptor = new Encryptor('a'.repeat(32))
    const encoded = encryptor.base64Encode(Buffer.from('boost is awesome'))
    t.deepEqual(encryptor.base64Decode(Buffer.from(encoded, 'base64')), 'boost is awesome')
  }

  async failsWithoutEncryptionKey (t) {
    t.throws(() => new Encryptor(null))
  }

  async usesAppKeyAsEncryptionKey (t) {
    t.truthy(new Encryptor())
  }

  async failsWithTooShortEncryptionKey (t) {
    t.throws(() => new Encryptor('a'.repeat(5)))
  }
}

module.exports = new EncryptorTest()
