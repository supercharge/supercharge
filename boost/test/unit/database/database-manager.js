'use strict'

const Database = util('database')
const BaseTest = util('base-test')

class TestConnector {
  connect () {}
  close () {}
}

class DatabaseManagerTest extends BaseTest {
  async serialConnectsDefaultConnection (t) {
    await Database.connect()
    t.is(Object.keys(Database.connections).length, 1)
    await Database.close()
  }

  async serialConnectsMongoose (t) {
    await Database.connect('mongoose')
    t.is(Object.keys(Database.connections).length, 1)
    await Database.close('mongoose')
  }

  async serialConnectsOnlyOnce (t) {
    await Database.connect('mongoose')
    await Database.connect('mongoose')

    t.is(Object.keys(Database.connections).length, 1)
    await Database.close('mongoose')
  }

  async serialClosesSingleConnection (t) {
    await Database.connect('mongoose')
    t.is(Object.keys(Database.connections).length, 1)

    await Database.close('mongoose')
    t.is(Object.keys(Database.connections).length, 0)
  }

  async doesNotFailWhenClosingAlreadyClosedConnection (t) {
    const name = 'closing'
    Database.addConnection(name, new TestConnector())

    await Database.close(name)
    await Database.close(name)
    t.false(Object.keys(Database.connections).includes(name))
  }

  async serialClosesAllConnections (t) {
    Database.addConnection('test1', new TestConnector())
    Database.addConnection('test2', new TestConnector())

    await Database.connect('test1')
    await Database.connect('test2')
    t.is(Object.keys(Database.connections).length, 2)

    await Database.close()
    t.is(Object.keys(Database.connections).length, 0)
  }

  async returnsAvailableMongooseConnection (t) {
    await Database.connect('mongoose')
    t.truthy(Database.connection('mongoose'))
  }

  async returnsCustomConnection (t) {
    Database.addConnection('customConnection', new TestConnector())
    t.truthy(Database.connection('customConnection'))
  }

  async throwsWhenTryingToGetUnavailableConnection (t) {
    t.throws(() => Database.connection('unavailable'))
  }

  async returnsAvailableMongooseConnector (t) {
    t.truthy(Database.connector('mongoose'))
  }

  async throwsForUnavailableConnector (t) {
    const stub = this.stub(Database, 'connectors').returns({})
    t.throws(() => Database.connector('mongoose'))
    stub.restore()
  }

  async returnsDefaultConfiguration (t) {
    t.truthy(Database.configuration())
  }

  async returnsConfiguration (t) {
    t.truthy(Database.configuration('mongoose'))
  }

  async throwsForUnavailableDatabaseConfiguration (t) {
    t.throws(() => Database.configuration('unavailable'))
  }

  async returnsDefaultConnection (t) {
    t.truthy(Database.defaultConnection())
  }

  async addConnection (t) {
    Database.addConnection('test', new TestConnector())
    t.true(!!Database.connections['test'])
    delete Database.connections['test']
  }

  async throwsWhenAddingAConnectionTwice (t) {
    Database.addConnection('testConnection', new TestConnector())
    t.throws(() => {
      Database.addConnection('testConnection', new TestConnector())
    })
  }

  async throwsWhenAddingAConnectionWithoutName (t) {
    t.throws(() => Database.addConnection())
  }

  async throwsWhenAddingAConnectionWithoutConnector (t) {
    t.throws(() => Database.addConnection('testing'))
  }
}

module.exports = new DatabaseManagerTest()
