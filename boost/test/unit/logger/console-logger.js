'use strict'

const BaseTest = util('base-test')
const ConsoleLogger = util('logging/console-logger')

class ConsoleLoggerTest extends BaseTest {
  async colorForLevel (t) {
    const logger = new ConsoleLogger()
    t.truthy(logger.getColorForLevel('info'))
  }

  async fallbackColorForLevel (t) {
    const logger = new ConsoleLogger()
    t.truthy(logger.getColorForLevel('unavailable-level'))
  }

  async customFormat (t) {
    const logger = new ConsoleLogger()
    t.truthy(logger.format({ level: 'debug', message: 'testing' }))
  }
}

module.exports = new ConsoleLoggerTest()
