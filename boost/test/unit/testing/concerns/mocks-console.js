'use strict'

const BaseTest = util('base-test')

class MockConsoleTest extends BaseTest {
  async serialMocksConsole (t) {
    this.mockConsole()

    console.log('test message')

    const { stdout, stderr } = this.endConsoleMock()
    t.falsy(stderr)

    console.log(stdout)
    t.true(stdout.includes('test message'))
  }

  async serialMuteConsoleAsAliasForMockConsole (t) {
    this.muteConsole()

    console.log('second test')

    const { stdout, stderr } = this.consoleOutput()
    t.falsy(stderr)
    t.true(stdout.includes('second test'))
  }
}

module.exports = new MockConsoleTest()
