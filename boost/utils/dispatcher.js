'use strict'

const _ = require('lodash')
const Path = require('path')
const Fs = util('filesystem')
const Podium = require('podium')
const RequireAll = require('require-all')

class Dispatcher {
  constructor() {
    this.eventsFolder = Path.resolve(__appRoot, 'app', 'events')
    this.listenersFolder = Path.resolve(__appRoot, 'app', 'listeners')

    this.events = {}
    this.listeners = {}
    this.podium = new Podium()
  }

  async init() {
    await this.loadEvents()
    await this.loadListeners()
    await this.registerUserEvents()
    await this.registerSystemEvents()
  }

  listen(eventName, handler) {
    if (!eventName) {
      throw new Error(
        'Event name missing. Pass an event name as the first parameter to "Event.listen(eventName, listener)".'
      )
    }

    if (!handler) {
      throw new Error(
        'Listener missing. Pass an event listener as the second parameter to "Event.listen(eventName, listener)".'
      )
    }

    this.registerUserEvent(eventName)
    this.registerUserListenerForEvent(eventName, handler)
  }

  fire(event, data) {
    if (typeof event === 'string') {
      this.podium.emit(event, data)
    } else {
      this.podium.emit(event.emits(), event)
    }
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

  ensureEvent(event) {
    if (Object.getPrototypeOf(event.constructor).name !== 'Event') {
      throw new Error(`Your event "${event.constructor.name}" must extend the "Event" utility`)
    }
  }

  ensureListener(listener) {
    if (Object.getPrototypeOf(listener.constructor).name !== 'Listener') {
      throw new Error(`Your event listener "${listener.constructor.name}" must extend the "Listener" utility`)
    }
  }

  async registerSystemEvents() {
    const listeners = this.getSystemEventListeners()

    _.forEach(listeners, listener => {
      this.registerListeners(listener.on(), listener)
    })
  }

  getSystemEventListeners() {
    return _.map(this.listeners, Listener => {
      const listener = new Listener()
      this.ensureListener(listener)
      return listener
    }).filter(listener => {
      return listener.type() === 'system'
    })
  }

  async registerUserEvents() {
    _.forEach(this.events, async Event => {
      const event = new Event()
      this.ensureEvent(event)

      const listeners = this.getListenersByEventName(event.emits())
      this.registerListeners(event.emits(), listeners)
    })
  }

  getListenersByEventName(eventName) {
    return _.map(this.listeners, Listener => {
      const listener = new Listener()
      return listener.on().includes(eventName) ? listener : null
    }).filter(listener => !!listener)
  }

  registerListeners(eventName, listeners) {
    const events = Array.isArray(eventName) ? eventName : [eventName]
    listeners = Array.isArray(listeners) ? listeners : [listeners]

    _.forEach(events, eventName => {
      this.registerUserEvent(eventName)

      _.forEach(listeners, listener => {
        listener.type() === 'user'
          ? this.registerUserListenerForEvent(eventName, listener.handle)
          : this.registerSystemEvent(eventName, listener.handle)
      })
    })
  }

  async registerUserEvent(eventName) {
    this.podium.registerEvent(eventName)
  }

  registerUserListenerForEvent(eventName, handler) {
    this.podium.addListener(eventName, handler)
  }

  async registerSystemEvent(event, handler) {
    process.on(event, await handler)
  }
}

module.exports = new Dispatcher()
