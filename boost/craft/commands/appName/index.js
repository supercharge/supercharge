'use strict'

const BaseCommand = require('../base')

class AppName extends BaseCommand {
  static get signature() {
    return `
    app:name
    { name: Your application name }
    { --env=@value: .env file location }
    `
  }

  static get description() {
    return 'Set your application name'
  }

  async handle({ name }, { env }) {
    await this.run(async () => {
      const envPath = await this.getEnvPath(env)
      await this.updateEnvContents(envPath, { APP_NAME: `"${name}"` })

      this.completed('updated', `Your application name is now: ${name}`)
    })
  }
}

module.exports = AppName
