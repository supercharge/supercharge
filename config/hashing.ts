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
   * Supported drivers: `bcrypt`
   *
   */
  driver: Env.get('HASH_DRIVER', 'bcrypt'),

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
    rounds: Number(Env.get('HASH_BCRYPT_ROUNDS', 12)),
  },
}

export default hashConfig
