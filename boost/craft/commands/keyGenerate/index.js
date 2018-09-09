'use strict'

const Encryption = util('encryptor')
const BaseCommand = require('../base')

/**
 * Craft command to generate an application key.
 */
class KeyGenerate extends BaseCommand {
  /**
   * Options allow the user to forcefully
   * override an existing application key
   * or only echo the key on the CLI.
   */
  static get signature () {
    return `
    key:generate
    { -f, --force: Override any existing application key }
    { --env=@value: .env file location }
    { -s, --size=@value: The key size which defaults to 32 characters }
    { --echo: Echo the key instead of writing to the file }
    `
  }

  /**
   * Returns the command description.
   */
  static get description () {
    return 'Generate a secret application key'
  }

  /**
   * Generate an application key and either
   * echo it to the terminal or set it
   * in the project's .env file.
   *
   * @param {Object} arguments
   */
  async handle (_, { env, echo }) {
    const key = Encryption.generateKey()

    if (echo) {
      return this.completed('generated', `Application key: ${key}`)
    }

    await this.run(async () => {
      const envPath = await this.getEnvPath(env)
      await this.updateEnvContents(envPath, { APP_KEY: key })

      this.completed('generated', `Application key [${key}] set as APP_KEY in your .env file`)
    })
  }
}

module.exports = KeyGenerate
