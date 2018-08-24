'use strict'

const _ = require('lodash')
const Path = require('path')
const Fs = util('filesystem')
const Podium = require('podium')
const RequireAll = require('require-all')

class StartupEventHandler {
  constructor() {
    this.eventsFolder = Path.resolve(__appRoot, 'app', 'events')
    this.listenersFolder = Path.resolve(__appRoot, 'app', 'listeners')

    this.events = {}
    this.listeners = {}
    this.podium = new Podium()
  }

  async listen() {
    await this.loadEvents()
    await this.loadListeners()
    await this.registerListeners()
    await this.assignListenersToEvents()
  }

  async loadEvents() {
    if (await Fs.pathExists(this.eventsFolder)) {
      this.events = RequireAll({
        dirname: this.eventsFolder,
        filter: /(.*)\.js$/
      })
    }
  }

  async loadListeners() {
    if (await Fs.pathExists(this.listenersFolder)) {
      this.listeners = RequireAll({
        dirname: this.listenersFolder,
        filter: /(.*)\.js$/
      })
    }
  }

  async registerListeners() {
    _.forEach(this.listeners, async Listener => {
      const listener = new Listener()

      if (!this.isEventListener(listener)) {
        throw new Error(`Your event listener "${listener.constructor.name}" must extend the "Listener" utility`)
      }

      this.registerListener(listener)
    })
  }

  isEventListener(listener) {
    return Object.getPrototypeOf(listener.constructor).name === 'Listener'
  }

  registerListener(listener) {
    if (Array.isArray(listener.on())) {
      _.forEach(listener.on(), event => {
        listener.type === 'user'
          ? this.registerUserEvent(event, listener.handle)
          : this.registerProcessEvent(event, listener.handle)
      })
    }
  }

  async registerUserEvent(event, handler) {
    this.podium.registerEvent(event)
    this.podium.addListener(event, await handler)
  }

  async registerProcessEvent(event, handler) {
    process.on(event, await handler)
  }

  async assignListenersToEvents() {}

  async getListenersForEvent(event) {}
}

module.exports = StartupEventHandler
