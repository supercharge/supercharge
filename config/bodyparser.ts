'use strict'

import { BodyparserOptions } from '@supercharge/contracts'

const bodyparserConfig: BodyparserOptions = {
  /**
   * --------------------------------------------------------------------------
   * Request Payload Encoding
   * --------------------------------------------------------------------------
   *
   * The encoding used to decode the incoming request data. The default encoding
   * is `utf8`. You may change it to any of the supported encodings in Node.js’
   * `BufferEncoding` type:
   *     "ascii" | "utf8" | "utf16le" | "ucs2" |
   *     "base64" | "base64url" | "latin1" | "binary" | "hex"
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
   * This section configures the JSON parsing options. The given options only
   * apply to JSON parsing and you may adjust the settings to your needs.
   *
   */
  json: {
    /**
     * ------------------------------------------------------------------------
     * JSON Parsing Limit
     * ------------------------------------------------------------------------
     *
     * This option configures the JSON body limit. The body parser throws an
     * HTTP error with status code 413 if an incoming request body exceeds
     * the given limit.
     */
    limit: '1mb',

    /**
     * ------------------------------------------------------------------------
     * JSON Parsing Content Types
     * ------------------------------------------------------------------------
     *
     * This option defines the JSON content types which will be parsed. You
     * may use the `*` wildcard symbol to allow content types confirming
     * to the given definition.
     */
    contentTypes: [
      'application/json',
      'application/*+json',
      'application/csp-report',
    ],
  },

  /**
   * --------------------------------------------------------------------------
   * Form Parser Options
   * --------------------------------------------------------------------------
   *
   * This section configures the form parsing options. The given options only
   * apply to JSON parsing and you may adjust the settings to your needs.
   *
   */
  form: {
    /**
     * ------------------------------------------------------------------------
     * Form Parsing Limit
     * ------------------------------------------------------------------------
     *
     * This option configures the JSON body limit. The body parser throws an
     * HTTP error with status code 413 if an incoming request body exceeds
     * the given limit.
     */
    limit: '56kb',

    /**
     * ------------------------------------------------------------------------
     * Form Parsing Content Types
     * ------------------------------------------------------------------------
     *
     * This option defines the form content types which will be parsed. You
     * may use the `*` wildcard symbol to allow content types confirming
     * to the given definition.
     */
    contentTypes: [
      'application/x-www-form-urlencoded'
    ]
  },

  /**
   * --------------------------------------------------------------------------
   * Text Parser Options
   * --------------------------------------------------------------------------
   *
   * This section configures the text parsing options. The given options only
   * apply to text parsing and you may adjust the settings to your needs.
   *
   */
  text: {
    /**
     * ------------------------------------------------------------------------
     * Text Parsing Limit
     * ------------------------------------------------------------------------
     *
     * This option configures the text body limit. The body parser throws an
     * HTTP error with status code 413 if an incoming request body exceeds
     * the given limit.
     */
    limit: '56kb',

    /**
     * ------------------------------------------------------------------------
     * Text Parsing Content Types
     * ------------------------------------------------------------------------
     *
     * This option defines the JSON content types which will be parsed. You
     * may use the `*` wildcard symbol to allow content types confirming
     * to the given definition.
     */
    contentTypes: ['text/*'],
  },

  /**
   * --------------------------------------------------------------------------
   * Multipart Parser Options
   * --------------------------------------------------------------------------
   *
   * This section configures the multipart parsing options. The given options
   * apply to multipart parsing and you may adjust the settings to your needs.
   *
   */
  multipart: {
    /**
     * ------------------------------------------------------------------------
     * Multipart File Size Limit
     * ------------------------------------------------------------------------
     *
     * This option configures the limit of an uploaded file.
     */
    maxFileSize: '200mb',

    /**
     * ------------------------------------------------------------------------
     * Multipart Parsing Content Types
     * ------------------------------------------------------------------------
     *
     * This option defines the multipart content types which will be parsed. You
     * may use the `*` wildcard symbol to allow content types confirming
     * to the given definition.
     */
    contentTypes: [
      'multipart/form-data'
    ],

    /**
     * ------------------------------------------------------------------------
     * Maximum Number of Multipart Fields
     * ------------------------------------------------------------------------
     *
     * This option defines the maximum number of fields allowed in the request
     * body. **Notice:** setting this option to `0` means unlimited fields.
     */
    maxFields: 1_000
  }
}

export default bodyparserConfig
