'use strict'

const User = model('user')
const BaseTest = util('base-test')

class UserProfileTest extends BaseTest {
  async beforeEach ({ context }) {
    context.user = await this.fakeUser({ name: 'Marcus' })
  }

  async afterEach ({ context }) {
    await this.deleteUser(context.user)
  }

  async showsUserProfile (t) {
    const response = await this.actAs(t.context.user).get('/profile')
    t.is(response.statusCode, 200)
  }

  async failsShowingProfileWhenUnauthenticated (t) {
    const response = await this.get('/profile')

    t.is(response.statusCode, 302)
    t.is(response.headers['location'], `/login?next=${encodeURIComponent('/profile')}`)
  }

  async serialSuceedsProfileUpdateName (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/profile',
      payload: {
        email: user.email,
        name: 'Updated'
      }
    })

    t.is(response.statusCode, 200)

    const updated = await User.findById(user.id)
    t.is(updated.name, 'Updated')
    t.is(updated.email, user.email)
    t.not(user.name, updated.name)
  }

  async serialSuceedsProfileUpdateEmail (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/profile',
      payload: {
        email: 'updated@email.com',
        name: user.name
      }
    })

    t.is(response.statusCode, 200)

    const updated = await User.findById(user.id)
    t.is(updated.email, 'updated@email.com')
    t.not(user.email, user.name)
    t.is(user.name, updated.name)
  }

  async serialSuceedsProfileUpdateEmailWithoutName (t) {
    const user = await this.fakeUser({ name: 'Marcus' })

    const response = await this.actAs(user).post({
      uri: '/profile',
      payload: {
        email: 'updated@email.com'
      }
    })

    t.is(response.statusCode, 200)

    const updated = await User.findById(user.id)
    t.is(updated.email, 'updated@email.com')
    t.is(user.name, updated.name)

    await this.deleteUser(user)
  }

  async serialSuceedsProfileUpdateWithSameUserData (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/profile',
      payload: {
        email: user.email,
        name: user.name
      }
    })

    t.is(response.statusCode, 200)

    const updated = await User.findById(user.id)
    t.is(updated.email, user.email)
    t.is(user.name, updated.name)
  }

  async failsProfileUpdateWithoutEmailAddress (t) {
    const user = t.context.user

    const response = await this.actAs(user).post({
      uri: '/profile',
      payload: {
        name: 'Updated'
      }
    })

    t.is(response.statusCode, 400)
  }

  async serialFailsEmailUpdateForExistingAddress (t) {
    const user = await this.fakeUser()

    const response = await this.actAs(t.context.user).post({
      uri: '/profile',
      payload: {
        email: user.email
      }
    })

    t.is(response.statusCode, 409)

    await this.deleteUser(user)
  }
}

module.exports = new UserProfileTest()
