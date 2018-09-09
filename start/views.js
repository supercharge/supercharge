'use strict'

const Path = require('path')
const Config = util('config')
const Handlebars = require('handlebars')
const HandlebarsHelpers = require('handlebars-helpers')

class Views {
  /**
   * Create a Handlebars instance for view rendering.
   * Enrich the Handlebars instance to include
   * dozens of useful layout helpers.
   */
  constructor () {
    this.handlebarsInstance = this.initializeHandlebars()
  }

  /**
   * Initialize an extended handlebars instance that
   * contains hundrets of additional helpers.
   */
  initializeHandlebars () {
    HandlebarsHelpers({
      handlebars: Handlebars
    })

    return Handlebars
  }
  /**
   * Create the hapi view configuration object. This
   * configuration includes the Handlebars render
   * engine and view configurations.
   *
   * @returns {Object}
   */
  load () {
    return {
      engines: {
        hbs: this.handlebars()
      },
      path: this.viewPaths(),
      layoutPath: this.layoutLocations(),
      layout: 'default',
      helpersPath: this.helpersLocations(),
      partialsPath: this.partialsLocations(),
      isCached: Config.get('app.env') === 'production',
      context: function (request) {
        return {
          request,
          user: request.auth.credentials,
          title: Config.get('app.name'),
          description: Config.get('app.description')
        }
      }
    }
  }

  /**
   * Returns the handlebars instance.
   *
   * @returns {Object}
   */
  handlebars () {
    return this.handlebarsInstance
  }

  /**
   * Resolve the path to view files. This defaults
   * to `<project-root>/resources/views`.
   *
   * @returns {String}
   */
  viewsPath () {
    return __resourcePath('views')
  }

  /**
   * Return an array of folders that contain the
   * Handlebars views.
   *
   * @returns {Array}
   */
  viewPaths () {
    const views = this.viewsPath()

    // eslint-disable-next-line
    return [
      views,
      Path.resolve(views, 'vendor', 'boost')
    ]
  }

  /**
   * Return an array of folders that contain
   * Handlebars layouts.
   *
   * @returns {Array}
   */
  layoutLocations () {
    const views = this.viewsPath()

    // eslint-disable-next-line
    return [
      Path.resolve(views, 'layouts'),
      Path.resolve(views, 'vendor', 'boost', 'layouts')
    ]
  }

  /**
   * Return an array of folders that contain
   * Handlebars helpers.
   *
   * @returns {Array}
   */
  helpersLocations () {
    const views = this.viewsPath()

    // eslint-disable-next-line
    return [
      Path.resolve(views, 'helpers'),
      Path.resolve(views, 'vendor', 'boost', 'helpers')
    ]
  }

  /**
   * Return an array of folders that contain
   * Handlebars partial views.
   *
   * @returns {Array}
   */
  partialsLocations () {
    const views = this.viewsPath()

    // eslint-disable-next-line
    return [
      Path.resolve(views, 'partials'),
      Path.resolve(views, 'vendor', 'boost', 'partials')
    ]
  }
}

module.exports = new Views()
