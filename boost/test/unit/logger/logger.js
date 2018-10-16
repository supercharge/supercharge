'use strict'

const Logger = util('logger')
const BaseTest = util('base-test')

class LoggerTest extends BaseTest {
  before () {
    Logger.logger.silent = true
  }

  after () {
    Logger.logger.silent = false
  }

  async loadsDefaultDriver (t) {
    t.truthy(Logger.logger)
  }

  async useConsoleLogger (t) {
    const consoleLogger = new Logger.constructor()
    consoleLogger.driver = 'console'
    consoleLogger.loadDrivers()

    t.is(consoleLogger.logger._readableState.pipesCount, 1)
  }

  async useFileLogger (t) {
    const fileLogger = new Logger.constructor()
    fileLogger.driver = 'file'
    fileLogger.loadDrivers()

    t.is(fileLogger.logger._readableState.pipesCount, 1)
    t.truthy(fileLogger.logger._readableState.pipes.dirname)
  }

  async useStackedLogger (t) {
    const stackedLogger = new Logger.constructor()
    stackedLogger.driver = 'stacked'
    stackedLogger.loadDrivers()

    t.is(stackedLogger.logger._readableState.pipesCount, 2)
  }

  async serialLogsSillyLevelMessage (t) {
    Logger.silly('test message')
    t.pass()
  }

  async serialLogsDebugLevelMessage (t) {
    Logger.debug('test message')
    t.pass()
  }

  async serialLogsVerboseLevelMessage (t) {
    Logger.verbose('test message')
    t.pass()
  }

  async serialLogsInfoLevelMessage (t) {
    Logger.info('test message')
    t.pass()
  }

  async serialLogsWarnLevelMessage (t) {
    Logger.warn('test message')
    t.pass()
  }

  async serialLogsErrorLevelMessage (t) {
    Logger.error('test message')
    t.pass()
  }
}

module.exports = new LoggerTest()
