'use strict'

const BaseTest = util('base-test')

class MongooseUserModelTests extends BaseTest {
  async userAsJsonHasNoPassword (t) {
    const user = await this.fakeUser()

    t.falsy(user.toJSON().password)
    t.falsy(user.toJSON()._id)
    t.is(user.toJSON().email, user.email)
  }
}

module.exports = new MongooseUserModelTests()
