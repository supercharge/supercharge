'use strict'

const Env = util('env')

module.exports = {
  /**
   * --------------------------------------------------------------------------
   * Default Hash Driver
   * --------------------------------------------------------------------------
   *
   * This controls the default hash driver that is used
   * by the hashing utility. The default hasing driver
   * is bcrypt.
   *
   * Supported drivers: `bcrypt`, `argon`
   *
   */
  driver: Env.get('HASH_DRIVER', 'bcrypt'),

  /**
   * --------------------------------------------------------------------------
   * Bcrypt Options
   * --------------------------------------------------------------------------
   *
   * Customize the bcrypt hashing configuration. The bcrypt hashing
   * driver allows you to customize the rounds. A higher number for
   * rounds increases the amount of time a to create a hash.
   *
   */
  bcrypt: {
    rounds: Env.get('BCRYPT_ROUNDS', 12)
  },

  /**
   * --------------------------------------------------------------------------
   * Argon Options
   * --------------------------------------------------------------------------
   *
   * Customize the argon hashing configuration. The argon hashing driver
   * allows you to customize memory, time and threads. The values depend
   * on your system's resources and control the time to create a hash.
   *
   */
  argon: {
    memory: Env.get('HASH_ARGON_MEMORY', 1024),
    time: Env.get('HASH_ARGON_TIME', 2),
    threads: Env.get('HASH_ARGON_THREADS', 2)
  }
}
