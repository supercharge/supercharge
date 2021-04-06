'use strict'

export default class DevController {
  /**
   * Say hello.
   *
   * @param ctx HttpContext
   */
  index () {
    return 'Hello Marcus'
  }

  /**
   * Bonjour!
   */
  helloNorman ({ response }) {
    return response.payload('Bonjour Norman.')
  }
}
