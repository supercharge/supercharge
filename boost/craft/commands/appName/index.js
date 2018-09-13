'use strict'

const BaseCommand = require('./../base')

/**
 * Craft command to set the application name.
 */
class AppName extends BaseCommand {
  /**
   * Allow users to specify the application
   * name as a parameter or ask for the
   * name afterwards.
   */
  static get signature () {
    return `
    app:name
    { name?: Your application name }
    `
  }

  /**
   * Returns the command description.
   */
  static get description () {
    return 'Set your application name'
  }

  /**
   * Handle the command and set the aplication name
   * in the project's .env file.
   */
  async handle ({ name }) {
    if (!name) {
      name = await this.ask('The name of your application:')
    }

    await this.run(async () => {
      const envPath = await this.getEnvPath()
      await this.updateEnvContents(envPath, { APP_NAME: `"${name}"` })

      this.completed('updated', `Your application name is now: ${name}`)
    })
  }
}

module.exports = AppName
