'use strict'

const Path = require('path')
const BaseTest = util('base-test')
const Launch = require(Path.resolve(__appRoot, 'start'))

class BaseRoutesTest extends BaseTest {
  before () {
    this.stub(console, 'error')
    this.stub(process, 'exit')
  }

  alwaysAfter () {
    console.error.restore()
    process.exit.restore()
  }

  async serialStartsAndStopsDefaultServer (t) {
    this.mockConsole()

    const launch = new Launch()
    await launch.launchWithFullSpeed()

    const server = launch.getServer()
    t.not(server.info.started, 0)

    process.emit('SIGTERM')
    await new Promise(resolve => setTimeout(resolve, 100))

    t.is(server.info.started, 0)

    const { stdout } = this.consoleOutput()
    t.true(stdout.includes('server started at'))
  }

  async serialFailsToStartServer (t) {
    const launch = new Launch()
    const server = launch.getServer()
    const stub = this.stub(server, 'start').throws(new Error())

    await launch.launch()

    this.sinon().assert.called(console.error)
    this.sinon().assert.called(process.exit)
    stub.restore()

    t.pass()
  }

  async serialRunsShutdownFunctions (t) {
    const launch = new Launch()
    const server = launch.getServer()
    const stub = this.stub(server, 'start').throws(new Error())

    await launch.launch()

    this.sinon().assert.called(console.error)
    this.sinon().assert.called(process.exit)
    stub.restore()

    t.pass()
  }
}

module.exports = new BaseRoutesTest()
