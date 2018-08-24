'use strict'

const Path = require('path')
const Dotenv = require('dotenv')
const { Command } = require('@adonisjs/ace')

class BaseCommand extends Command {
  async run(callback) {
    try {
      await callback()
    } catch (error) {
      this.printError(error)
      process.exit(1)
    }
  }

  printError(error) {
    console.log(`\n  ${this.chalk.bgRed(' ERROR ')} ${error.message}\n`)

    if (error.hint) {
      console.log(`\n  ${this.chalk.bgRed(' HELP ')} ${error.hint}\n`)
    }
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
    const content = await this.readFile(envPath)
    return Dotenv.parse(content)
  }

  async updateEnvContents(envPath, newEnvContent) {
    const updatedContents = Object.keys(newEnvContent)
      .map(key => `${key}=${newEnvContent[key]}`)
      .join('\n')

    await this.writeFile(envPath, updatedContents)
  }
}

module.exports = BaseCommand
