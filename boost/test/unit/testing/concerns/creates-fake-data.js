'use strict'

const BaseTest = util('base-test')

class CreatesFakeDataTest extends BaseTest {
  async throwsWhenDeletingUserByIdWithoutIdParameter (t) {
    await t.throwsAsync(this.deleteUser())
    await t.throwsAsync(this.deleteUserById())
  }

  async serialDeleteUsers (t) {
    await this.deleteUsers()
    t.pass()
  }
}

module.exports = new CreatesFakeDataTest()
