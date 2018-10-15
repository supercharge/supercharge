'use strict'

class Message {
  /**
   * Create a new message builder with
   * the same interface as the mailer.
   *
   * @param {Object} mailer
   */
  constructor (mailer) {
    this.address = {}
    this.mailer = mailer
  }

  /**
   * Set the recepients of this message.
   *
   * @param {Mixed} users
   */
  to (users) {
    this.address.to = users

    return this
  }

  /**
   * Set the recepients of this message.
   *
   * @param {String|Object|Array} users
   */
  cc (users) {
    this.address.cc = users

    return this
  }

  /**
   * Set the recepients of this message
   * in blind copy.
   *
   * @param {String|Object|Array} users
   */
  bcc (users) {
    this.address.bcc = users

    return this
  }

  /**
   * Set the sender of this message.
   *
   * @param {String|Object|Array} address
   * @param {String} name
   */
  from (address, name) {
    if (!name) {
      this.address.from = address
      return this
    }

    this.address.from = { address, name }

    return this
  }

  /**
   * Set the sender of this message.
   *
   * @param {String|Object|Array} address
   * @param {String} name
   */
  replyTo (address, name) {
    if (!name) {
      this.address.replyTo = address
      return this
    }

    this.address.replyTo = { address, name }

    return this
  }

  /**
   * Send a mailable instance.
   *
   * @param {Object} mailable
   */
  send (mailable) {
    return this.mailer.send(this.fill(mailable))
  }

  /**
   * Populate the attributes from this message
   * builder to the mailable.
   *
   * @param {Object} mailable
   *
   * @returns {Object} Mailable
   */
  fill (mailable) {
    return mailable
      .to(this.address.to)
      .cc(this.address.cc)
      .bcc(this.address.bcc)
      .from(this.address.from)
      .replyTo(this.address.replyTo)
  }
}

module.exports = Message
