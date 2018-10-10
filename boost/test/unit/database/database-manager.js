'use strict'

const Sinon = require('sinon')
const Database = util('database')
const BaseTest = util('base-test')

class DatabaseManagerTest extends BaseTest {
  async connectsOnlyOnce (t) {
    await Database.connect()
    await Database.connect()

    t.is(Object.keys(Database.connections).length, 1)
  }

  async returnsAvailableMongooseConnector (t) {
    t.true(!!Database.connector('mongoose'))
  }

  async throwsForUnavailableConnector (t) {
    const stub = Sinon.stub(Database, 'connectors').returns({})
    t.throws(() => Database.connector('mongoose'))
    stub.restore()
  }

  async returnsAvailableMongooseConnection (t) {
    t.true(!!Database.connection('mongoose'))
  }

  async throwsForUnavailableDatabaseConfiguration (t) {
    t.throws(() => Database.configuration('unavailable'))
  }

  async addConnection (t) {
    class Connector {
      connect () {}
      close () {}
    }

    Database.addConnection('test', new Connector())
    t.true(!!Database.connections['test'])
    delete Database.connections['test']
  }

  async throwsWhenAddingAConnectionTwice (t) {
    t.throws(() => Database.addConnection('mongoose'))
  }

  async throwsWhenAddingAConnectionWithoutName (t) {
    t.throws(() => Database.addConnection())
  }

  async throwsWhenAddingAConnectionWithoutConnector (t) {
    t.throws(() => Database.addConnection('testing'))
  }
}

module.exports = new DatabaseManagerTest()
