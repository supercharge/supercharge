'use strict'

const Env = util('env')
const Path = require('path')
const BaseTest = util('base-test')

class EnvTest extends BaseTest {
  async setEnvValue (t) {
    Env.set('BOOST_TEMP', 'temp-value')
    const value = Env.get('BOOST_TEMP')

    t.is(value, 'temp-value')
    delete process.env.BOOST_TEMP
  }

  async getEnvValueFallback (t) {
    const value = Env.get('NOT_AVAILABLE', 'tmp')
    t.is(value, 'tmp')
  }

  async usesEnvPath (t) {
    process.env.ENV_PATH = Path.resolve(__dirname, 'secrets.env')
    const envFile = Env.envFileName()

    t.is(envFile, process.env.ENV_PATH)
    delete process.env.ENV_PATH
  }

  async loadsEnvFileFromNodeEnv (t) {
    process.env.NODE_ENV = 'temp'
    const envFile = Env.envFileName()

    t.is(envFile, '.env.temp')
  }

  async loadsEnvFileWithoutNodeEnv (t) {
    delete process.env.NODE_ENV
    const envFile = Env.envFileName()

    t.is(envFile, '.env')
  }
  async loadsCustomEnvFile (t) {
    Env.load(Path.resolve(__dirname, 'secrets.env'))

    t.is(Env.get('VALUE'), 'Boost')
  }
}

module.exports = new EnvTest()
