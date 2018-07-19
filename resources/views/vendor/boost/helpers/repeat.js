'use strict'

const HandlebarsRepeatHelper = require('handlebars-helper-repeat')

/**
 * Block helper for repeating whatever is
 * inside the block n times.
 *
 * The package exposes three variables to
 * the block:
 * - "count" the total number of blocks being generated
 * - "index" the index of the current block
 * - "start" the start number to use instead of zero. Basically index + start
 *
 * @example
 * ```
 * {{#repeat count=2 start=17}}
 *    {{> button }}<span>{{@index}}</span>
 * {{else}}
 *   Nothing :(
 * {{/repeat}}
 * ```
 *
 * results in
 *
 * ```
 * <button>Click me!</button><span>17</span>
 * <button>Click me!</button><span>18</span>
 * ```
 */

module.exports = HandlebarsRepeatHelper
