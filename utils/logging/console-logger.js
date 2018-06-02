'use strict'

const Pino = require('pino')
const Chalk = require('chalk')

class PinoConsole {
  constructor(config) {
    const options = Object.assign(
      {},
      {
        prettyPrint: {
          // the "data" parameter (here destructured to { level, msg, time })
          // contains the actual data to log
          formatter: ({ level, msg, time }) => {
            const label = Pino.levels.labels[level]
            const Color = this.getChalkColor(label)

            // this prints a message like: "1519227724068 info Your geeky log message"
            return `${Chalk.gray(time)} ${Color(label)} ${msg}`
          }
        },
        level: 'trace'
      },
      config
    )

    return new Pino(options)
  }

  /**
   * Pino represents log levels as integers (e.g., 30, 40, etc.)
   *
   * trace = 10 (grey)
   * debug = 20 (blue)
   * info  = 30 (green)
   * warn  = 40 (yellow)
   * error = 50 (red)
   * fatal = 60 (bold red)
   *
   * Return a chalk function for the related log level,
   * to print colored logs. E.g.,
   * info  => green
   * warn  => yellow
   * error => red
   *
   * @param {integer} level - Pino log level in numbered format
   */
  getChalkColor(level) {
    return this.color(level) || Chalk.white
  }

  color(level) {
    return this.levelColors()[level]
  }

  /**
   * Color levels, ranked ascending
   * from chilly to freakout
   */
  levelColors() {
    return {
      trace: Chalk.grey,
      debug: Chalk.blue,
      info: Chalk.green,
      warn: Chalk.yellow,
      error: Chalk.red,
      fatal: Chalk.bold.red
    }
  }
}

module.exports = PinoConsole
