'use strict'

const Logger = util('logger')
const BaseTest = util('base-test')

class LoggerTest extends BaseTest {
  async loadsDefaultDriver (t) {
    t.truthy(Logger)
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
    const stub = this.stub(Logger.logger, 'silly')

    Logger.silly('test message')

    this.sinon().assert.called(stub)
    stub.restore()

    t.pass()
  }

  async serialLogsDebugLevelMessage (t) {
    const stub = this.stub(Logger.logger, 'debug')

    Logger.debug('test message')

    this.sinon().assert.called(stub)
    stub.restore()

    t.pass()
  }

  async serialLogsVerboseLevelMessage (t) {
    const stub = this.stub(Logger.logger, 'verbose')

    Logger.verbose('test message')

    this.sinon().assert.called(stub)
    stub.restore()

    t.pass()
  }

  async serialLogsInfoLevelMessage (t) {
    const stub = this.stub(Logger.logger, 'info')

    Logger.info('test message')

    this.sinon().assert.called(stub)
    stub.restore()

    t.pass()
  }

  async serialLogsWarnLevelMessage (t) {
    const stub = this.stub(Logger.logger, 'warn')

    Logger.warn('test message')

    this.sinon().assert.called(stub)
    stub.restore()

    t.pass()
  }

  async serialLogsErrorLevelMessage (t) {
    const stub = this.stub(Logger.logger, 'error')

    Logger.error('test message')

    this.sinon().assert.called(stub)
    stub.restore()

    t.pass()
  }
}

module.exports = new LoggerTest()
