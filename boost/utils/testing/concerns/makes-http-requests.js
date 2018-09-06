'use strict'

const Hapi = require('hapi')

class MakesHttpRequests {
  createServer() {
    return new Hapi.Server()
  }
}

module.exports = MakesHttpRequests
