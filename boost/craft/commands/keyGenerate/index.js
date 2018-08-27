'use strict'

const Encryption = util('encryptor')
const BaseCommand = require('../base')

class KeyGenerate extends BaseCommand {
  static get signature() {
    return `
    key:generate
    { -f, --force: Override any existing appplication key }
    { --env=@value: .env file location }
    { -s, --size=@value: The key size which defaults to 32 characters }
    { --echo: Echo the key instead of writing to the file }
    `
  }

  static get description() {
    return 'Generate a secret application key'
  }

  async handle(_, { env, echo }) {
    const key = Encryption.generateKey()

    if (echo) {
      return this.completed('generated', `application key: ${key}`)
    }

    await this.run(async () => {
      const envPath = await this.getEnvPath(env)
      await this.updateEnvContents(envPath, { APP_KEY: key })

      this.completed('generated', `application key [${key}] and set as APP_KEY in your .env file`)
    })
  }
}

module.exports = KeyGenerate
