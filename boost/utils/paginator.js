'use strict'

const _ = require('lodash')
const Boom = require('boom')
const Querystring = require('querystring')

/**
 * This paginator class creates a pagination object
 * based on the request and total amount
 * of available pagination items.
 */
class Paginator {
  /**
   * Create a new paginator instance that
   * returns the pagination object.
   *
   * @param {Object} params
   *
   * @returns {Object}
   */
  constructor ({ request, totalCount, perPage = 8 }) {
    if (!request) {
      throw new Boom('Request object required as first parameter in paginator')
    }

    if (!totalCount) {
      throw new Boom('Total count required as second parameter in paginator')
    }

    this.request = request
    this.lastPage = Math.ceil(totalCount / perPage)
    this.currentPage = this.getCurrentPage()
    this.from = this.currentPage * perPage - perPage

    const first = this.getFirst()
    const last = this.getLast()
    const prev = this.getPrevious()
    const next = this.getNext()

    return {
      total: totalCount,
      perPage,
      currentPage: this.currentPage,
      lastPage: this.lastPage,
      first,
      prev,
      next,
      last,
      from: this.from,
      to: this.from + perPage,
      link: this.linkHeader(first, prev, next, last)
    }
  }

  /**
   * Returns the current page from the request's
   * `page` query parameter.
   *
   * @param {Object} request
   *
   * @returns {Integer}
   */
  getCurrentPage () {
    return parseInt(this.request.query.page) || 1
  }

  /**
   * Returns the URI for the first page.
   *
   * @returns {String}
   */
  getFirst () {
    if (!this.isFirstPage()) {
      return this.composeUrl(1)
    }
  }

  /**
   * Returns the URI for the last page.
   *
   * @returns {String}
   */
  getLast () {
    if (!this.isLastPage()) {
      return this.composeUrl(this.lastPage)
    }
  }

  /**
   * Returns the URI for next page
   * based on the current page.
   *
   * @returns {String}
   */
  getNext () {
    if (!this.isLastPage()) {
      return this.composeUrl(this.currentPage + 1)
    }
  }

  /**
   * Returns the URI for previous page
   * based on the current page.
   *
   * @returns {String}
   */
  getPrevious () {
    if (!this.isFirstPage()) {
      return this.composeUrl(this.currentPage - 1)
    }
  }

  /**
   * Checks whether the current page is
   * the first page.
   *
   * @returns {Boolean}
   */
  isFirstPage () {
    return this.currentPage === 1
  }

  /**
   * Checks whether the current page is
   * the last page.
   *
   * @returns {Boolean}
   */
  isLastPage () {
    return this.currentPage === this.lastPage
  }

  /**
   * Checks whether the request's query
   * parameter has the current page.
   *
   * @returns {Boolean}
   */
  hasPage () {
    return !_.isNil(this.request.query.page)
  }

  /**
   * Composes a pagination URL that references
   * given `page`. The URL is based on the
   * requests URI and parameters.
   *
   * @param {Integer} page
   *
   * @returns {String}
   */
  composeUrl (page) {
    const protocol = this.request.headers['x-forwarded-proto'] || this.request.server.info.protocol || 'http'
    const queryParams = Object.assign({}, this.request.query, { page })
    const querystring = Querystring.stringify(queryParams)

    return `${protocol}://${this.request.info.host}${this.request.path}?${querystring}`
  }

  /**
   * Creates a single String containing the
   * pagination URLs for individual pages.
   *
   * @param {String} first
   * @param {String} prev
   * @param {String} next
   * @param {String} last
   *
   * @returns {String}
   */
  linkHeader (first, prev, next, last) {
    return this.createLinkHeader({ first, prev, next, last })
  }

  /**
   * Creates a single String containing the
   * pagination URLs for individual pages.
   *
   * @param {Object} links
   *
   * @returns {String}
   */
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
