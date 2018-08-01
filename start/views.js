'use strict'

const Path = require('path')
const Config = util('config')
const Handlebars = require('handlebars')
const HandlebarsHelpers = require('handlebars-helpers')

class Views {
  /**
   * Create the hapi view configuration object. This
   * configuration includes the Handlebars render
   * engine and view configurations.
   *
   * @returns {Object}
   */
  load() {
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
      context: function(request) {
        return {
          request,
          title: Config.get('app.name'),
          user: request.auth.credentials
        }
      }
    }
  }

  /**
   * Create a Handlebars instance for view rendering.
   * Enrich the Handlebars instance to include
   * dozens of useful layout helpers.
   *
   * @returns {Object}
   */
  handlebars() {
    HandlebarsHelpers({
      handlebars: Handlebars
    })

    return Handlebars
  }

  /**
   * Resolve the path to view files. This defaults
   * to `<project-root>/resources/views`.
   *
   * @returns {String}
   */
  viewsPath() {
    return __resourcePath('views')
  }

  /**
   * Return an array of folders that contain the
   * Handlebars views.
   *
   * @returns {Array}
   */
  viewPaths() {
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
  layoutLocations() {
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
  helpersLocations() {
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
  partialsLocations() {
    const views = this.viewsPath()

    // eslint-disable-next-line
    return [
      Path.resolve(views, 'partials'),
      Path.resolve(views, 'vendor', 'boost', 'partials')
    ]
  }
}

module.exports = new Views()
