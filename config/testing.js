'use strict'

const Env = util('env')

module.exports = {
  /**
   * --------------------------------------------------------------------------
   * Testing framework
   * --------------------------------------------------------------------------
   *
   * This setting defines the test framework to use when running
   * your application tests. Ensure that your test files
   * satisfy the used framework’s requirements.
   *
   * Available drivers: `ava`
   *
   */
  driver: Env.get('TEST_DRIVER', 'ava')
}
