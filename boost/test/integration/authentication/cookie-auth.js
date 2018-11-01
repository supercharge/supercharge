'use strict'

const Config = util('config')
const BaseTest = util('base-test')

class CookieAuthTest extends BaseTest {
  async beforeEach ({ context }) {
    context.user = await this.fakeUser({ name: 'Marcus' })
  }

  async alwaysAfterEach ({ context }) {
    await this.deleteUser(context.user)
  }

  _getCookieFrom (header) {
    // eslint-disable-next-line
    return header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/)
  }

  async serialSucceedsAuthentication (t) {
    const user = t.context.user

    const login = await this.post({
      uri: '/login',
      payload: {
        email: user.email,
        password: user.passwordPlain
      }
    })

    t.is(login.statusCode, 302)
    t.is(login.headers['location'], '/home')

    const header = login.headers['set-cookie']
    const cookie = this._getCookieFrom(header)

    const response = await this.withCookie(Config.get('session.cookie'), cookie[1]).get('/profile')
    t.is(response.statusCode, 200)
  }

  async serialFailsAuthenticationForMissingUser (t) {
    const user = await this.fakeUser()

    const login = await this.post({
      uri: '/login',
      payload: {
        email: user.email,
        password: user.passwordPlain
      }
    })

    t.is(login.statusCode, 302)

    await this.deleteUser(user)

    const header = login.headers['set-cookie']
    const cookie = this._getCookieFrom(header)

    const response = await this.withCookie(Config.get('session.cookie'), cookie[1]).get('/profile')
    t.is(response.statusCode, 302)
    t.is(response.headers['location'], `/login?next=${encodeURIComponent('/profile')}`)
  }

  async serialFailsAuthenticationWithMissingUserIdInSession (t) {
    const path = '/fake-login'

    const login = await this
      .addRoute({
        path,
        method: 'GET',
        handler: request => {
          request.cookieAuth.set({ name: 'marcus' })
          return 'marcus'
        }
      }).get(path)

    t.is(login.statusCode, 200)

    const header = login.headers['set-cookie']
    const cookie = this._getCookieFrom(header)

    const response = await this.withCookie(Config.get('session.cookie'), cookie[1]).get('/profile')
    t.is(response.statusCode, 302)
    t.is(response.headers['location'], `/login?next=${encodeURIComponent('/profile')}`)
  }

  async serialThrowsWithoutAppKey (t) {
    const key = Config.get('app.key')
    Config.set('app.key', null)

    await t.throwsAsync(this.get('/'))

    Config.set('app.key', key)
  }
}

module.exports = new CookieAuthTest()
