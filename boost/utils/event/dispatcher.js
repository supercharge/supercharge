'use strict'

const _ = require('lodash')
const Path = require('path')
const Fs = util('filesystem')
const EventEmitter = require('events')
const RequireAll = require('require-all')

/**
 * The event dispatcher registers all events
 * with the assigned listeners to the event
 * emitter.
 */
class Dispatcher {
  /**
   * Initialize a new Dispatcher instance.
   */
  constructor () {
    this.eventsFolder = Path.resolve(__appRoot, 'app', 'events')
    this.listenersFolder = Path.resolve(__appRoot, 'app', 'listeners')

    this.events = {}
    this.listeners = {}
    this.emitter = new EventEmitter()
  }

  /**
   * Load all events and listener files from the
   * file system. Assign user and system
   * listeners to the related events.
   */
  async init () {
    await this.loadEvents()
    await this.loadListeners()
    await this.registerUserEvents()
    await this.registerSystemEventListeners()
  }

  /**
   * Shortcut method for `Event.listen(eventName, handler)`.
   *
   * @param {String} eventName
   * @param {object} handler
   */
  on (eventName, handler) {
    this.listen(eventName, handler)
  }

  /**
   * Register a new event with listener without
   * using the class convention. This way
   * allows only a single listener per event.
   *
   * @param {String} eventName
   * @param {Object} handler
   */
  listen (eventName, handler) {
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

    this.registerUserListenerForEvent(eventName, handler)
  }

  /**
   * Fire an event.
   *
   * @param {String} event
   * @param  {...Mixed} data
   */
  fire (event, ...data) {
    if (typeof event === 'string') {
      this.emitter.emit(event, ...data)
    } else {
      this.emitter.emit(event.emit(), event)
    }
  }

  /**
   * Load all events from the file system.
   */
  async loadEvents () {
    this.events = await this.loadFiles(this.eventsFolder)
  }

  /**
   * Load all listeners from the file system.
   */
  async loadListeners () {
    this.listeners = await this.loadFiles(this.listenersFolder)
  }

  /**
   * Load event or listener files from there
   * related folder on the filesystem.
   *
   * @param {String} folder
   */
  async loadFiles (folder) {
    if (await Fs.pathExists(folder)) {
      return RequireAll({
        dirname: folder,
        filter: /(.*)\.js$/
      })
    }

    return {}
  }

  /**
   * Ensure that the given instance extends the
   * `Event` class.
   */
  ensureEvent (event) {
    if (Object.getPrototypeOf(event.constructor).name !== 'Event') {
      throw new Error(`Your event "${event.constructor.name}" must extend the "Event" utility`)
    }
  }

  /**
   * Ensure that the given instance extends the
   * `Listener` class.
   */
  ensureListener (listener) {
    if (Object.getPrototypeOf(listener.constructor).name !== 'Listener') {
      throw new Error(`Your event listener "${listener.constructor.name}" must extend the "Listener" utility`)
    }
  }

  /**
   * Register listeners that listen for events
   * emitted by the Node.js process.
   */
  async registerSystemEventListeners () {
    const listeners = this.getSystemEventListeners()

    _.forEach(listeners, listener => {
      this.registerListeners(listener.on(), listener)
    })
  }

  /**
   * Find all listeners of type `system`. All event
   * files in the app directory should return
   * the type `user`.
   */
  getSystemEventListeners () {
    return _.map(this.listeners, Listener => {
      const listener = new Listener()
      this.ensureListener(listener)
      return listener
    }).filter(listener => {
      return listener.type() === 'system'
    })
  }

  /**
   * Register user events and the assigned
   * listeners to the event emitter.
   */
  async registerUserEvents () {
    _.forEach(this.events, async Event => {
      const event = new Event()
      this.ensureEvent(event)

      const listeners = this.getListenersByEventName(event.emit())
      this.registerListeners(event.emit(), listeners)
    })
  }

  /**
   * Find all event listeners for the given event.
   *
   * @param {String} eventName
   */
  getListenersByEventName (eventName) {
    return _.map(this.listeners, Listener => {
      const listener = new Listener()
      return listener.on().includes(eventName) ? listener : null
    }).filter(listener => !!listener)
  }

  /**
   * Register the array of event listeners to
   * the event.
   *
   * @param {String} eventNames
   * @param {Array|Object} listeners
   */
  registerListeners (eventNames, listeners) {
    const events = Array.isArray(eventNames) ? eventNames : [eventNames]
    listeners = Array.isArray(listeners) ? listeners : [listeners]

    _.forEach(events, eventName => {
      _.forEach(listeners, listener => {
        listener.type() === 'user'
          ? this.registerUserListenerForEvent(eventName, listener.handle)
          : this.registerSystemEvent(eventName, listener.handle)
      })
    })
  }

  /**
   * Register the event to the dispatcher.
   *
   * @param {String} eventName
   */
  async registerUserEvent (eventName) {
    this.emitter.on(eventName)
  }

  /**
   * Add an event `listener` to the given
   * `eventName`.
   *
   * @param {String} eventName
   * @param {Object} listener
   */
  registerUserListenerForEvent (eventName, listener) {
    this.emitter.on(eventName, listener)
  }

  /**
   * Register an event listener for a Node.js event.
   *
   * @param {String} eventName
   * @param {Object} listener
   */
  async registerSystemEvent (eventName, listener) {
    process.on(eventName, await listener)
  }

  /**
   * Remove `listener` from the given `event`.
   * This removes only user listeners, because
   * system listeners can’t be turned off.
   *
   * @param {String} event
   * @param {Object} listener
   */
  forget (event, listener) {
    if (!listener) {
      listener = event
      this.ensureListener(listener)
      event = listener.on()
    }

    this.forgetUserListener(event, listener)
  }

  /**
   * Turn off and remove the event listener.
   *
   * @param {String} event
   * @param {Object} listener
   */
  forgetUserListener (event, listener) {
    const events = Array.isArray(event) ? event : [event]

    _.forEach(events, eventName => {
      if (listener.type() === 'user') {
        this.emitter.off(eventName, listener)
      }
    })
  }
}

module.exports = new Dispatcher()
