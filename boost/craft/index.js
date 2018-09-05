'use strict'

const _ = require('lodash')
const Ace = require('@adonisjs/ace')
const Commands = require('./commands')

/**
 * Boost ships with a helping CLI hand called Craft.
 * Craft will let users quickly scaffold project
 * files, like models, tests, and many more.
 */
class Cli {
  /**
   * Create a new Craft instance and
   * register all Commands.
   */
  constructor() {
    _.forEach(Commands, Command => Ace.addCommand(Command))
  }

  /**
   * Kick off Craft and run the
   * selected command.
   */
  makeItHappen() {
    Ace.wireUpWithCommander()
    Ace.invoke()
  }
}

module.exports = Cli
