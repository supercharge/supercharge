'use strict'

const _ = require('lodash')
const Path = require('path')

class Globals {
  constructor ({ fromAppRoot: appRoot } = {}) {
    this.appRoot = appRoot || __dirname
    this.create()
  }

  /**
   * Defines the project's app root directory.
   *
   * @param {String} appRoot
   */
  fromAppRoot (appRoot) {
    this.appRoot = appRoot
    this.create()

    return this
  }

  /**
   * Create the globals in the application
   * environment
   */
  create () {
    this.setAppRoot()

    this.util()
    this.mail()
    this.event()
    this.model()
    this.frequire()
    this.viewsPath()
    this.storagePath()
    this.resourcePath()
  }

  /**
   * Absolute path to the application's root directory.
   */
  setAppRoot () {
    global.__appRoot = Path.resolve(this.appRoot)
  }

  /**
   * Simplify imports with a global fancy “require”
   * function that imports local modules. The import
   * path starts at project’s root.
   *
   * @example
   * ```js
   * const { User } = frequire('app/models')
   * const { Logger } = frequire('boost/utils/logger')
   * ```
   */
  frequire () {
    global.frequire = (...path) => require(Path.resolve(this.appRoot, ...path))
  }

  /**
   * Absolute path to the resources/views directory.
   */
  viewsPath () {
    global.__viewsPath = (...path) => Path.resolve(this.appRoot, 'resources', 'views', ...path)
  }

  /**
   * Absolute path to the storage directory.
   */
  storagePath () {
    global.__storagePath = (...path) => Path.resolve(this.appRoot, 'storage', ...path)
  }

  /**
   * Absolute path to the resources directory.
   */
  resourcePath () {
    global.__resourcePath = (...path) => Path.resolve(this.appRoot, 'resources', ...path)
  }

  /**
   * Shorthand function to quickly import Boost
   * utilities. The utilities are part of the
   * Boost installation
   */
  util () {
    global.util = (...path) => require(Path.resolve(this.appRoot, 'boost', 'utils', ...path))
  }

  /**
   * Shorthand function to quickly import Boost
   * mailables.
   */
  mail () {
    global.mail = (...path) => require(Path.resolve(this.appRoot, 'app', 'mails', ...path))
  }

  /**
   * Shorthand function to quickly import Boost
   * events.
   */
  model () {
    global.model = (...path) => require(Path.resolve(this.appRoot, 'app', 'models', ...path))
  }

  /**
   * Shorthand function to quickly import Boost
   * events.
   */
  event () {
    global.event = (...path) => require(Path.resolve(this.appRoot, 'app', 'events', ...path))
  }
}

module.exports = Globals
