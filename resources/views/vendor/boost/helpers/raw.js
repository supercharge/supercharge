'use strict'

/**
 * Raw block helper for templates that need
 * to handle unprocessed mustache blocks.
 *
 * For example, Vue.js uses mustache templates
 * and Handlebars would render the Vue.js tags
 * before Vue can pick them up.
 *
 * @example
 * ```
 * {{{{raw}}}}
 *   {{bar}}
 * {{{{/raw}}}}
 * ```
 *
 * will render
 *
 * ```
 * {{bar}}
 * ```
 * Find more details in the Handlebars documentation:
 * https://handlebarsjs.com/block_helpers.html#raw-blocks
 *
 * @returns String - JSON
 */
function raw(options) {
  return options.fn()
}

module.exports = raw
