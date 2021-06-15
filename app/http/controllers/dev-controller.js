'use strict'

/**
 * @typedef { import('@supercharge/contracts').HttpContext } HttpContext
 */

export default class DevController {
  /**
   * Bonjour!
   *
   * @param {HttpContext} ctx
   */
  handle ({ response }) {
    return response.payload('Bonjour Norman.')
  }
}
