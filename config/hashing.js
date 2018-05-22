'use strict'

const Path = require('path')
const Env = require(Path.resolve(__dirname, '..', 'utils', 'env'))

module.exports = {
  /*
    |--------------------------------------------------------------------------
    | Default Hash Driver
    |--------------------------------------------------------------------------
    |
    | TODO
    |
    | Supported: "bcrypt", "argon"
    |
    */

  driver: Env.get('HASH_DRIVER', 'bcrypt'),

  /*
    |--------------------------------------------------------------------------
    | Bcrypt Options
    |--------------------------------------------------------------------------
    |
    | Here you may specify the configuration options that should be used when
    | passwords are hashed using the Bcrypt algorithm. This will allow you
    | to control the amount of time it takes to hash the given password.
    |
    */

  bcrypt: {
    rounds: Env.get('BCRYPT_ROUNDS', 12)
  },

  /*
    |--------------------------------------------------------------------------
    | Argon Options
    |--------------------------------------------------------------------------
    |
    | Here you may specify the configuration options that should be used when
    | passwords are hashed using the Argon algorithm. These will allow you
    | to control the amount of time it takes to hash the given password.
    |
    */

  argon: {
    memory: Env.get('HASH_ARGON_MEMORY', 1024),
    time: Env.get('HASH_ARGON_TIME', 2),
    threads: Env.get('HASH_ARGON_THREADS', 2)
  }
}
