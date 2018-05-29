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
            const Color = this.getChalkColor(level)
            const label = Pino.levels.labels[level]

            // this prints a message like: "1519227724068 info Your geeky log message"
            return `${Chalk.gray(time)} ${Color(label)} ${msg}`
          }
        },
        level: 'trace'
      },
      config
    )

    this.logger = new Pino(options)
    this.colors = this.colorLevels()

    return this.logger
  }

  // log(level, msg, ...options) {
  //   this.logger.log(level, msg, ...options)
  // }

  /**
   * Pino uses integers (e.g., 30, 40, etc.)
   * to represent log levels:
   *
   * trace = 10 (grey)
   * debug = 20 (blue)
   * info  = 30 (green)
   * warn  = 40 (yellow)
   * error = 50 (red )
   * fatal = 60 (bold red)
   *
   * Return a chalk function for the
   * related log level, e.g.:
   * info  => green
   * warn  => yellow
   * error => red
   *
   * @param {integer} level - Pino log level in numbered format
   */
  getChalkColor(level) {
    // calculate the array position based on the Pino log level
    const position = level / 10 - 1

    // now grab the Chalk function like it's hot
    return this.color(position) || Chalk.white
  }

  color(color) {
    return this.colors[color]
  }

  /**
   * Color levels, ranked ascending
   * from chilly to freakout
   */
  colorLevels() {
    return [
      Chalk.grey,
      Chalk.blue,
      Chalk.green,
      Chalk.yellow,
      Chalk.red,
      Chalk.bold.red // this second bold red is for "fatal" errors
    ]
  }
}

module.exports = PinoConsole
