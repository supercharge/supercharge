'use strict'

const Path = require('path')
const DotenvEdit = require('edit-dotenv')
const { Command } = require('@adonisjs/ace')

/**
 * This is Craft's base command providing
 * convenience features like pretty
 * error printing to all commands.
 */
class BaseCommand extends Command {
  /**
   * A wrapper method to run a given command
   * in a safe environment and also prints
   * pretty errors on failure.
   *
   * @param {Function} callback
   */
  async run (callback) {
    this.chalk.enabled = true

    try {
      await this.ensureInProjectRoot()
      await callback()
    } catch (error) {
      this.prettyPrintError(error)
      process.exit(1)
    }
  }

  /**
   * Pretty print the error message.
   *
   * @param {Object} error
   */
  prettyPrintError (error) {
    console.log(`\n  ${this.chalk.bold.red('Error:')} ${this.chalk.red(error.message)}\n`)
  }

  /**
   * Ensure that the application is not
   * initialized already.
   *
   * @param {Boolean} force
   *
   * @returns {Promise}
   *
   * @throws
   */
  async ensureNotInstalled (force) {
    const exists = await this.pathExists(Path.join(__appRoot, '.env'))

    if (!exists) {
      return Promise.resolve()
    }

    if (force) {
      console.log(this.chalk.red('Found existing app setup. Forcefully overriding it.\n'))

      return Promise.resolve()
    }

    throw new Error('Your project already includes a .env file. Use the "--force" flag for a fresh setup.')
  }

  /**
   * Make sure the command is run from
   * the project's root folder.
   *
   * @returns {Promise}
   *
   * @throws
   */
  async ensureInProjectRoot () {
    const exists = await this.pathExists(Path.join(process.cwd(), 'craft'))

    if (!exists) {
      throw new Error(`Make sure you are inside a Boost app to run the ${this.constructor.commandName} command`)
    }
  }

  /**
   * Returns the absolute path for the
   * given `file`. If no `file` is
   * provided, it falls back to '.env'.
   *
   * @param {String} file
   *
   * @returns {String}
   */
  async getEnvPath (file) {
    file = file || '.env'

    return this.getAbsolutePath(file)
  }

  /**
   * Returns the absolute path for `file`.
   *
   * @param {String} file
   *
   * @returns {String}
   */
  async getAbsolutePath (file) {
    await this.ensureFile(file)

    return Path.isAbsolute(file) ? file : Path.join(process.cwd(), file)
  }

  /**
   * Returns the contents of `file`.
   *
   * @param {String} file
   *
   * @returns {String}
   */
  async getFileContent (file) {
    return this.readFile(file, 'utf8')
  }

  /**
   * Update the file content of the file
   * located at `envPath` with the
   * provided `changes`.
   *
   * @param {String} envPath
   * @param {String} changes
   */
  async updateEnvContents (envPath, changes) {
    const dotenvContent = await this.getFileContent(envPath)
    const updatedContent = DotenvEdit(dotenvContent, changes)

    await this.writeFile(envPath, updatedContent)
  }
}

module.exports = BaseCommand
