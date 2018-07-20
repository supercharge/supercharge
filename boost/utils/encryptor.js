'use strict'

const Crypto = require('crypto')
const Config = require('./config')
const Encryptor = require('simple-encryptor')

class Encryption {
  /**
   * Create a new Encrypter instance.
   *
   * @param {string} key
   * @param {object} options
   */
  constructor(key = Config.get('app.key'), options) {
    this.key = key
    this.encryptor = Encryptor(Object.assign({ key }, options))
  }

  /**
   * Create an encryption key for the given cipher.
   *
   * @param {string} cipher
   * @returns string
   */
  static generateKey(cipher) {
    const bytes = cipher === 'AES-128-CBC' ? 16 : 32
    return Crypto.randomBytes(bytes).toString('base64')
  }

  /**
   * Get the encryption key.
   *
   * @returns string
   */
  getKey() {
    return this.key
  }

  /**
   * Encrypt the given value
   *
   * @param {mixed} value
   * @returns string
   */
  encrypt(value) {
    return this.encryptor.encrypt(value)
  }

  /**
   * Decrypt the given value.
   *
   * @param {string} value
   * @returns {mixed}
   */
  decrypt(value) {
    return this.encryptor.decrypt(value)
  }

  /**
   * Calculate the HMAC of the given string.
   *
   * @param {string} string
   */
  hmac(string) {
    return this.encryptor.hmac(string)
  }

  /**
   * Base64 encode the given value.
   *
   * @param {mixed} value
   * @returns string
   */
  base64Encode(value) {
    return Buffer.from(value).toString('base64')
  }

  /**
   * Decode a base64 encoded string
   *
   * @param {mixed} value
   * @returns string
   */
  base64Decode(value) {
    const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value, 'base64')
    return buffer.toString('utf8')
  }
}

module.exports = Encryption
