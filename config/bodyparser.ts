'use strict'

export default {
  /**
   * --------------------------------------------------------------------------
   * Request Payload Encoding
   * --------------------------------------------------------------------------
   *
   * Tba.
   *
   */
  encoding: 'utf-8',

  /**
   * --------------------------------------------------------------------------
   * Parsed HTTP Methods
   * --------------------------------------------------------------------------
   *
   * Tba.
   *
   * {String[]} What HTTP methods to enable body parsing for; should be used in preference to strict mode.
   *
   * GET, HEAD, and DELETE requests have no defined semantics for the request body,
   * but this doesn't mean they may not be valid in certain use cases.
   * koa-body will only parse HTTP request bodies for POST, PUT, and PATCH by default
   *
   * see http://tools.ietf.org/html/draft-ietf-httpbis-p2-semantics-19#section-6.3
   */
   methods: ['POST', 'PUT', 'PATCH'],

  /**
   * --------------------------------------------------------------------------
   * JSON Parser Options
   * --------------------------------------------------------------------------
   *
   * {String|Integer} The byte (if integer) limit of the JSON body, default 1mb
   *
   */
  json: {
    limit: '1mb',
    strict: true,
  },

  /**
   * --------------------------------------------------------------------------
   * Text Parser Options
   * --------------------------------------------------------------------------
   *
   * {String|Integer} The byte (if integer) limit of the JSON body, default 1mb
   *
   */
  text: {
    limit: '56kb',
  },


  /**
   * --------------------------------------------------------------------------
   * Form Parser Options
   * --------------------------------------------------------------------------
   *
   * {String|Integer} The byte (if integer) limit of the JSON body, default 1mb
   *
   */
  formUrlEncoded: {
    limit: '56kb',
  },
}
