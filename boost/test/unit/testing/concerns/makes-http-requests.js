'use strict'

const BaseTest = util('base-test')

class MakesHttpRequestsTest extends BaseTest {
  async assignsKeyValueHeader (t) {
    const request = await this.withHeader('name', 'Marcus')

    t.deepEqual(request.headers, { name: 'Marcus' })
  }

  async assignsHeadersAsObject (t) {
    const request = await this.withHeaders({ passion: 'boost' })

    t.deepEqual(request.headers, { passion: 'boost' })
  }

  async withoutMiddlewareAsString (t) {
    const request = await this.withoutMiddleware('testing')

    t.deepEqual(request.excludedMiddleware, ['testing'])
  }

  async withoutMiddlewareAsArray (t) {
    const request = await this.withoutMiddleware(['testing'])

    t.deepEqual(request.excludedMiddleware, ['testing'])
  }

  async withoutMiddlewareUnique (t) {
    const request = await this
      .withoutMiddleware(['testing'])
      .withoutMiddleware(['testing'])

    t.deepEqual(request.excludedMiddleware, ['testing'])
  }

  async usesCookies (t) {
    const response = await this.withCookie('name', 'Marcus').get('/cookie')

    t.is(response.statusCode, 404)
  }

  async sendsGetRequestAsObject (t) {
    const path = `/${this.randomKey()}`

    const response = await this.addRoute({
      path,
      method: 'GET',
      handler: (request) => request.headers['x-name']
    }).get({
      uri: path,
      headers: { 'x-name': 'Marcus' }
    })

    t.is(response.statusCode, 200)
    t.is(response.payload, 'Marcus')
  }

  async defaultsToGetRequest (t) {
    const path = `/${this.randomKey()}`

    const response = await this.request().addRoute({
      path,
      method: 'GET',
      handler: (request) => request.headers['x-name']
    }).inject({
      uri: path,
      headers: { 'x-name': 'Marcus' }
    })

    t.is(response.statusCode, 200)
    t.is(response.payload, 'Marcus')
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
    const path = `/${this.randomKey()}`

    const response = await this.addRoute({
      path,
      method: 'DELETE',
      handler: () => 'Deleted.'
    }).delete(path)

    t.is(response.statusCode, 200)
    t.is(response.payload, 'Deleted.')
  }

  async sendsDeleteRequestAsObject (t) {
    const path = `/${this.randomKey()}`

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
