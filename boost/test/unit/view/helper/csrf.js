'use strict'

const Config = util('config')
const BaseTest = util('base-test')

class CsrfHelperTest extends BaseTest {
  async createsHtmlInputForCsrf (t) {
    const tokenName = Config.get('session.token')
    const data = { [tokenName]: 'test-csrf' }

    const input = await this.render('<form>{{csrf}}</form>', data)

    t.true(input.includes('<input type="hidden"'))
    t.true(input.includes('value="test-csrf"'))
    t.true(input.includes(`name="${tokenName}"`))
  }

  async emptyStringForMissingCsrfToken (t) {
    const input = await this.render('<form>{{csrf}}</form>', {})
    t.is(input, '<form></form>')
  }
}

module.exports = new CsrfHelperTest()
