'use strict'

const Path = require('path')
const Config = util('config')
const BaseTest = util('base-test')

class ConfigTest extends BaseTest {
  async before () {
    Config.configPath = Path.resolve(__dirname, 'fixtures')
    Config.loadConfigFiles()
  }

  async loadsConfigFromTmpFolder (t) {
    t.truthy(Config.config)
    t.truthy(Object.keys(Config.config).length, 1)
  }

  async getConfigValue (t) {
    const value = Config.get('testconfig.key')
    t.is(value, 'value')
  }

  async fallbackValue (t) {
    const value = Config.get('testconfig.unavailable', 'fallback')
    t.is(value, 'fallback')
  }

  async doesNotThrow (t) {
    const value = Config.get('testconfig.unavailable')
    t.is(value, undefined)
  }
}

module.exports = new ConfigTest()
