'use strict'

const Config = util('config')
const BaseTest = util('base-test')
const MongooseConnector = util('database/mongoose-connector')

class MongooseConnectorTest extends BaseTest {
  async serialConnectorLifecycle (t) {
    const connector = new MongooseConnector(Config.get('database.connections.mongoose'))
    const consoleStub = this.stub(console, 'error')

    await connector.connect()
    await connector.close()

    this.sinon().assert.notCalled(consoleStub)
    consoleStub.restore()

    t.pass()
  }

  async serialConsoleLogConnectionError (t) {
    const connector = new MongooseConnector({})

    const consoleStub = this.stub(console, 'error')
    const connectStub = this.stub(connector, 'connectionString').returns('mongodb://wrong-string')

    await connector.connect()

    this.sinon().assert.called(consoleStub)
    consoleStub.restore()
    connectStub.restore()

    t.pass()
  }

  async serialThrowsWithoutConfig (t) {
    t.throws(() => new MongooseConnector())
  }
}

module.exports = new MongooseConnectorTest()
