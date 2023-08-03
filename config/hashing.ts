'use strict'

import { Env } from '@supercharge/facades'
import { HashConfig } from '@supercharge/contracts'

const hashConfig: HashConfig = {
  /**
   * --------------------------------------------------------------------------
   * Default Hash Driver
   * --------------------------------------------------------------------------
   *
   * This option controls the default hash driver being used to hash values in
   * your application. By default, the framework uses the bcrypt algorithm
   * for hashing. And bcrypt is currently the only algorithm supported.
   *
   * Supported drivers: "bcrypt", "scrypt"
   *
   */
  driver: Env.get('HASH_DRIVER', 'scrypt'),

  /**
   * --------------------------------------------------------------------------
   * Bcrypt Options
   * --------------------------------------------------------------------------
   *
   * Customize the bcrypt hashing configuration to be used when creating hash
   * values using the bcrypt algorithm. You can customize the work factor.
   * Using a higher number increases the time used creating a hash value.
   *
   */
  bcrypt: {
    rounds: Env.number('HASH_BCRYPT_ROUNDS', 12),
  },

  /**
   * --------------------------------------------------------------------------
   * Scrypt Options
   * --------------------------------------------------------------------------
   *
   * Customize the scrypt hashing configuration to be used when creating hash
   * values using Node.js native scrypt implementation. Customize the used
   * options by increasing the cost factor, block size, salt, and more.
   *
   * @see https://nodejs.org/docs/latest-v18.x/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
   */
  scrypt: {
    /**
     * The CPU/memory cost factor. Must be a power of two and greater than one.
     */
    cost: 16384,

    /**
     * The block size parameter.
     */
    blockSize: 8,

    /**
     * The salt size parameter in bytes. It’s recommended to use a salt at least 16 bytes long.
     */
    saltSize: 16,

    /**
     * The desired key length in bytes.
     */
    keyLength: 64,

    /**
     * The parallelization parameter.
     */
    parallelization: 1,

    /**
     * The memory upper bound while generating the hash.
     * It’s an error when (approximately) 128 * cost * blockSize > maxMemory.
     */
    maxMemory: 16_781_312 // (128 * cost * blockSize + 4096 (leeway))
  }
}

export default hashConfig
