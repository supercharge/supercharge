'use strict'

const User = model('user')
const BaseTest = util('base-test')

class UserProfileTest extends BaseTest {
  async showsUserProfile (t) {
    const user = await this.fakeUser({ name: 'Marcus' })

    const response = await this.actAs(user).get('/profile')
    t.is(response.statusCode, 200)

    await this.deleteUser(user)
  }

  async failsShowingProfileWhenUnauthenticated (t) {
    const response = await this.get('/profile')

    t.is(response.statusCode, 302)
    t.is(response.headers['location'], `/login?next=${encodeURIComponent('/profile')}`)
  }

  async suceedsProfileNameUpdate (t) {
    const user = await this.fakeUser({ name: 'Marcus' })

    const response =
      await this
        .actAs(user)
        .withPayload({
          email: user.email,
          name: 'Updated'
        })
        .post('/profile')

    t.is(response.statusCode, 200)

    const updated = await User.findById(user.id)
    t.is(updated.name, 'Updated')
    t.is(updated.email, user.email)
    t.not(user.name, updated.name)

    await this.deleteUser(user)
  }

  async succeedsProfileUpdateEmail (t) {
    const user = await this.fakeUser({ name: 'Marcus' })

    const response = await this.actAs(user).post({
      uri: '/profile',
      payload: {
        email: 'updated@email.com',
        name: 'Other Marcus'
      }
    })

    t.is(response.statusCode, 200)

    const updated = await User.findById(user.id)
    t.is(updated.email, 'updated@email.com')
    t.is(updated.name, 'Other Marcus')
    t.not(user.email, user.name)

    await this.deleteUser(user)
  }

  async succeedsProfileUpdateEmailWithoutName (t) {
    const user = await this.fakeUser({ name: 'Marcus' })

    const response = await this.actAs(user).post({
      uri: '/profile',
      payload: {
        email: 'updated-without-name@email.com'
      }
    })

    t.is(response.statusCode, 200)

    const updated = await User.findById(user.id)
    t.is(updated.email, 'updated-without-name@email.com')
    t.is(user.name, updated.name)

    await this.deleteUser(user)
  }

  async suceedsProfileUpdateWithSameUserData (t) {
    const user = await this.fakeUser({ name: 'Marcus' })

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

    await this.deleteUser(user)
  }

  async failsProfileUpdateWithoutEmailAddress (t) {
    const user = await this.fakeUser({ name: 'Marcus' })

    const response = await this.actAs(user).post({
      uri: '/profile',
      payload: {
        name: 'Updated'
      }
    })

    t.is(response.statusCode, 400)

    await this.deleteUser(user)
  }

  async failsEmailUpdateForExistingAddress (t) {
    const norman = await this.fakeUser()
    const marcus = await this.fakeUser()

    const response = await this.actAs(marcus).post({
      uri: '/profile',
      payload: {
        email: norman.email
      }
    })

    t.is(response.statusCode, 409)

    await this.deleteUser(norman)
    await this.deleteUser(marcus)
  }
}

module.exports = new UserProfileTest()
