'use strict'

const Path = require('path')
const DotenvEdit = require('edit-dotenv')
const { Command } = require('@adonisjs/ace')

class BaseCommand extends Command {
  async run(callback) {
    this.chalk.enabled = true

    try {
      await this.ensureInProjectRoot()
      await callback()
    } catch (error) {
      this.printError(error)
      process.exit(1)
    }
  }

  printError(error) {
    console.log(`\n  ${this.chalk.bold.red('Error:')} ${this.chalk.red(error.message)}\n`)
  }

  async ensureNotInstalled(force) {
    const exists = await this.pathExists(Path.join(__appRoot, '.env'))

    if (!exists || force) {
      return Promise.resolve()
    }

    throw new Error('Your project already includes a .env file. Use the "--force" flag for a fresh setup.')
  }

  async ensureInProjectRoot() {
    const exists = await this.pathExists(Path.join(process.cwd(), 'craft'))

    if (!exists) {
      throw new Error(`Make sure you are inside a Boost app to run the ${this.constructor.commandName} command`)
    }
  }

  async getEnvPath(file) {
    file = file || '.env'
    return this.getAbsolutePath(file)
  }

  async getAbsolutePath(file) {
    await this.ensureFile(file)
    return Path.isAbsolute(file) ? file : Path.join(process.cwd(), file)
  }

  async getEnvContent(envPath) {
    return this.readFile(envPath, 'utf8')
  }

  async updateEnvContents(envPath, changes) {
    const dotenvContent = await this.getEnvContent(envPath)
    const updatedContent = DotenvEdit(dotenvContent, changes)

    await this.writeFile(envPath, updatedContent)
  }
}

module.exports = BaseCommand
