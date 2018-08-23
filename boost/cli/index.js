'use strict'

const Ace = require('@adonisjs/ace')
const Commands = require('./commands')

class Cli {
  constructor() {
    Object.keys(Commands).forEach(name => Ace.addCommand(Commands[name]))
  }

  makeItHappen() {
    Ace.wireUpWithCommander()
    Ace.invoke()
  }
}

module.exports = Cli
