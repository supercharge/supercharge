'use strict'

const Config = util('config')
const Database = util('database')
const BaseTest = util('base-test')
const Mongoose = require('mongoose')
const MongooseConnector = util('database/mongoose-connector')

class MongooseConnectorTest extends BaseTest {
  async serialConnectorLifecycle (t) {
    const connector = new MongooseConnector(Config.get('database.connections.mongoose'))
    const stub = this.stub(connector, 'onConnectionError').returns()

    await connector.connect()
    await connector.close()

    this.sinon().assert.notCalled(stub)
    stub.restore()

    t.pass()
  }

  async serialMongooseFailsToConnectWithBadConnectionString (t) {
    const connector = new MongooseConnector({
      host: 'wrong',
      port: 27017,
      database: 'not-existent'
    })

    const stub = this.stub(connector, 'onConnectionError').returns()

    await connector.connect()

    this.sinon().assert.notCalled(stub)
    stub.restore()

    t.pass()
  }

  async serialThrowsWithoutConfig (t) {
    t.throws(() => new MongooseConnector())
  }
}

module.exports = new MongooseConnectorTest()
