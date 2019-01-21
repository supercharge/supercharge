'use strict'

const MockIo = require('mock-stdio')

class MockConsole {
  /**
   * Collect terminal output for stdout and stderr
   * to simplify console testing.
   */
  mockConsole () {
    MockIo.start()
  }

  /**
   * Alias method for `mockConsole()`.
   */
  muteConsole () {
    this.mockConsole()
  }

  /**
   * Return the collected terminal output. Returns
   * and object with `stdout` and `stderr`
   * properties.
   */
  getConsoleOutput () {
    return MockIo.end()
  }

  /**
   * Shortcut method for `getConsoleOutput()`.
   */
  consoleOutput () {
    return this.getConsoleOutput()
  }

  /**
   * Alias method for `getConsoleOutput()`.
   */
  endConsoleMock () {
    return this.getConsoleOutput()
  }
}

module.exports = MockConsole
