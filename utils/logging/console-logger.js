'use strict'

const Chalk = require('chalk')
const Winston = require('winston')
const { combine, timestamp, printf } = Winston.format

class WinstonConsoleLogger {
  constructor(config) {
    return new Winston.transports.Console({
      format: combine(
        timestamp(),
        printf(info => {
          const Color = this.getColorForLevel(info.level)
          const time = new Date(info.timestamp).getTime()
          return `${Chalk.gray(time)} ${Color(info.level)} ${info.message}`
        })
      ),
      level: 'debug'
    })
  }

  /**
   * Return a chalk function for the related log level,
   * to print colored logs.
   *
   * E.g.,
   * info  => green
   * warn  => yellow
   * error => bold red
   *
   * @param {integer} label - Winston log level as a string label
   */
  getColorForLevel(label) {
    const colors = this.colors()

    return colors[label] || Chalk.white
  }

  /**
   * Color levels, ranked ascending
   * from freakout to chilly
   */
  colors() {
    return {
      error: Chalk.bold.red,
      warn: Chalk.yellow,
      info: Chalk.green,
      verbose: Chalk.blue,
      debug: Chalk.yellow,
      silly: Chalk.grey
    }
  }
}

module.exports = WinstonConsoleLogger
