'use strict'

const Path = require('path')
const Fs = require('fs-extra')
const Listr = require('listr')
const Execa = require('execa')
const BaseCommand = require('../base')

class Setup extends BaseCommand {
  static get signature() {
    return `
    setup
    { -n, --name=@value: Your application name }
    { -f, --force: Force a fresh application setup }
    `
  }

  static get description() {
    return 'Automated setup for your new Boost application'
  }

  async handle(_, { force: forceSetup, name: appName }) {
    console.log(this.chalk.green(`Initialize your Boost application.\n`))

    const tasks = new Listr([
      {
        title: 'Install project dependencies',
        task: this.installDependencies
      },
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
    } catch (error) {
      // console.error(error)
    }
  }

  async installDependencies() {
    const child = Execa('npm', ['install'])
    // child.stdout.pipe(process.stdout)
    await child
  }

  async copyEnvFile(forceSetup) {
    const isInstalled = await this.isInstalled()

    if (!isInstalled || forceSetup) {
      /* eslint-disable-next-line */
      return Fs.copy(
        Path.join(__appRoot, '.env.example'),
        Path.join(__appRoot, '.env')
      )
    }

    throw new Error('You application is already initialized. Use the "--force" flag for a fresh setup.')
  }

  async isInstalled() {
    return this.pathExists(Path.join(__appRoot, '.env'))
  }

  async generateAppKey() {
    await Execa('node', ['craft', 'key:generate'], { cwd: __appRoot })
  }

  async setAppName(name) {
    await Execa('node', ['craft', 'app:name', name], { cwd: __appRoot })
  }

  finalNote(appName = 'Boost') {
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
