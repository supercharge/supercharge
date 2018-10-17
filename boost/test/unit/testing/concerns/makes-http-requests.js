'use strict'

const BaseTest = util('base-test')

class MakesHttpRequestsTest extends BaseTest {
  async usesCookies (t) {
    const response = await this.cookie('name', 'Marcus').get('/cookie')

    t.is(response.statusCode, 404)
  }

  async sendsPutRequestWithoutRoute (t) {
    const response = await this.put({ uri: '/put' })

    t.is(response.statusCode, 404)
  }

  async sendsPatchRequestWithoutRoute (t) {
    const response = await this.patch({ uri: '/patch' })

    t.is(response.statusCode, 404)
  }

  async sendsDeleteRequestWithoutRoute (t) {
    const response = await this.delete('/delete')

    t.is(response.statusCode, 404)
  }

  async sendsDeleteRequestAsUrl (t) {
    const path = `/${this.randomId()}`

    const response = await this.addRoute({
      path,
      method: 'DELETE',
      handler: () => 'Deleted.'
    }).delete(path)

    t.is(response.statusCode, 200)
    t.is(response.payload, 'Deleted.')
  }

  async sendsDeleteRequestAsObject (t) {
    const path = `/${this.randomId()}`

    const response = await this.addRoute({
      path,
      method: 'DELETE',
      handler: (request) => request.headers['x-name']
    }).delete({
      uri: path,
      headers: { 'x-name': 'Marcus' }
    })

    t.is(response.statusCode, 200)
    t.is(response.payload, 'Marcus')
  }
}

module.exports = new MakesHttpRequestsTest()
