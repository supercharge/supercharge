'use strict'

class Message {
  /**
   * Create a new message builder with
   * the same interface as the mailer.
   *
   * @param {Object} mailer
   */
  constructor(mailer) {
    this.mailer = mailer
  }

  /**
   * Set the recepients of this message.
   *
   * @param {Mixed} users
   */
  to(users) {
    this.to = users

    return this
  }

  /**
   * Set the recepients of this message.
   *
   * @param {String|Object|Array} users
   */
  cc(users) {
    this.cc = users

    return this
  }

  /**
   * Set the recepients of this message
   * in blind copy.
   *
   * @param {String|Object|Array} users
   */
  bcc(users) {
    this.bcc = users

    return this
  }

  /**
   * Set the sender of this message.
   *
   * @param {String|Object|Array} address
   * @param {String} name
   */
  from(address, name) {
    this.from = {
      address,
      name
    }

    return this
  }

  /**
   * Set the sender of this message.
   *
   * @param {String|Object|Array} address
   * @param {String} name
   */
  replyTo(address, name) {
    this.replyTo = {
      address,
      name
    }

    return this
  }

  /**
   * Send a mailable instance.
   *
   * @param {Object} mailable
   */
  send(mailable) {
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
  fill(mailable) {
    return mailable
      .to(this.to)
      .cc(this.cc)
      .bcc(this.bcc)
      .from(this.from)
      .replyTo(this.replyTo)
  }
}

module.exports = Message
