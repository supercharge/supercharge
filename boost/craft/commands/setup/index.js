'use strict'

const Fs = util('filesystem')
const Listr = require('listr')
const Execa = require('execa')
const BaseCommand = require('../base')

/**
 * This command does the required steps
 * to set up a new Boost application.
 */
class Setup extends BaseCommand {
  /**
   * Convenience command to quickly set up
   * a Boost application.
   */
  static get signature () {
    return `
    setup
    { -n, --name=@value: Your application name }
    { -f, --force: Force a fresh application setup }
    `
  }

  /**
   * Returns the command description.
   */
  static get description () {
    return 'Automated setup for your new Boost application'
  }

  /**
   * Handle the application setup and execute
   * a sequential list of setup tasks.
   *
   * @param {Object} _
   * @param {Object} arguments
   */
  async handle (_, { force: forceSetup, name: appName }) {
    console.log(this.chalk.green(`Initialize your Boost application.\n`))

    const tasks = new Listr([
      {
        title: 'Prepare .env file',
        task: async () => {
          await this.copyEnvFile(forceSetup)
        }
      },
      {
        title: 'Generate application key',
        task: async () => {
          await this.generateAppKey(appName)
        }
      },
      {
        title: 'Set application name',
        enabled: () => !!appName,
        task: async () => {
          await this.setAppName(appName)
        }
      }
    ])

    try {
      await tasks.run()
      this.finalNote(appName)
    } catch (ignoreErr) {}
  }

  /**
   * Copy the `.env.example` file over to `.env`.
   *
   * @param {Boolean} forceSetup
   */
  async copyEnvFile (forceSetup) {
    await this.ensureNotInstalled(forceSetup)

    const source = await this.getEnvPath('.env.example')
    const destination = await this.getEnvPath()

    return Fs.copy(source, destination)
  }

  /**
   * Generate an application key.
   */
  async generateAppKey () {
    await Execa('node', ['craft', 'key:generate'], { cwd: __appRoot })
  }

  /**
   * Set the application name.
   *
   * @param {String} name
   */
  async setAppName (name) {
    await Execa('node', ['craft', 'app:name', name], { cwd: __appRoot })
  }

  /**
   * Print out a final setup note with
   * instructions on how to start
   * the Boost web server.
   *
   * @param {String} appName
   */
  finalNote (appName) {
    appName = appName || 'Boost'

    const lines = [
      '',
      '🚀  Your project is ready for take off',
      `👉  Launch the ${appName} server with:`,
      '',
      `   ${this.chalk.dim('$')} ${this.chalk.cyan('node server')}`,
      ''
    ]

    lines.forEach(line => console.log(line))
  }
}

module.exports = Setup
