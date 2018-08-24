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
    `
  }

  static get description() {
    return 'Automated setup for your new Boost application'
  }

  async handle(_, { name: appName }) {
    console.log(this.chalk.green(`Initialize your Boost application.\n`))

    const tasks = new Listr([
      {
        title: 'Install project dependencies',
        task: this.installDependencies
      },
      {
        title: 'Prepare .env file',
        task: this.copyEnvFile
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
    } catch (error) {
      console.log(error)
    }

    this.finalNote(appName)
  }

  async installDependencies() {
    const child = Execa('npm', ['install'])
    // child.stdout.pipe(process.stdout)
    await child
  }

  async copyEnvFile() {
    /* eslint-disable-next-line */
    await Fs.copy(
      Path.join(__appRoot, '.env.example'),
      Path.join(__appRoot, 'secrets.env')
    )
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
