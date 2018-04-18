'use strict'

const _ = require('lodash')
const Boom = require('boom')
const Querystring = require('querystring')

class Paginator {
  constructor (request, totalCount, perPage = 8) {
    if (!request) {
      throw new Boom('Request object required as first parameter in paginator')
    }

    if (!totalCount) {
      throw new Boom('Total count required as second parameter in paginator')
    }

    const lastPage = Math.ceil(totalCount / perPage)
    const currentPage = this.getCurrentPage(request)
    const from = currentPage * perPage - perPage

    const first = this.getFirst(request, currentPage)
    const last = this.getLast(request, lastPage)
    const prev = this.getPrevious(request, currentPage)
    const next = this.getNext(request, currentPage, lastPage)

    // respond a pagination JS object
    return {
      total: totalCount,
      perPage,
      currentPage,
      lastPage,
      first,
      prev,
      next,
      last,
      from,
      to: from + perPage,
      link: this.linkHeader(first, prev, next, last)
    }
  }

  getCurrentPage (request) {
    return parseFloat(request.query.page) || 1
  }

  getFirst (request, currentPage) {
    if (!this.isFirstPage(currentPage)) {
      return this.composeUrl(request, 1)
    }
  }

  getLast (request, lastPage) {
    if (!this.isLastPage(this.getCurrentPage(request), lastPage)) {
      return this.composeUrl(request, lastPage)
    }
  }

  getNext (request, currentPage, lastPage) {
    // return if current page is the last one, there's no more
    if (!this.isLastPage(currentPage, lastPage)) {
      return this.composeUrl(request, currentPage + 1)
    }
  }

  getPrevious (request, currentPage) {
    // return if current page is the first one, there's no zero :)
    if (!this.isFirstPage(currentPage)) {
      return this.composeUrl(request, currentPage - 1)
    }
  }

  isFirstPage (currentPage) {
    return currentPage === 1
  }

  isLastPage (currentPage, lastPage) {
    return currentPage === lastPage
  }

  hasPage (request) {
    return !_.isNil(request.query.page)
  }

  composeUrl (request, page) {
    // fetch HTTP protocol from reverse proxy
    const proxyProtocol = request.headers && request.headers['x-forwarded-proto']
    // protocol hierarchy: proxy, server, default 'http'
    const protocol = proxyProtocol || request.server.info.protocol || 'http'

    // compose URL for given page
    const queryParams = Object.assign(request.query, { page })
    const query = Querystring.stringify(queryParams)

    return `${protocol}://${request.info.host}${request.path}?${query}`
  }

  linkHeader (first, prev, next, last) {
    return this.createLinkHeader({
      first,
      prev,
      next,
      last
    })
  }

  createLinkHeader (links) {
    const headers = []

    _.forOwn(links, (link, key) => {
      if (link) {
        headers.push(`<${link}>; rel="${key}"`)
      }
    })

    return headers.join(', ') || undefined
  }
}

module.exports = Paginator
