'use strict'

const Path = require('path')
const Config = util('config')
const Handlebars = require('handlebars')

class Views {
  configure(server) {
    server.views({
      engines: {
        hbs: Handlebars
      },
      path: this.viewPaths(),
      layoutPath: this.layoutLocations(),
      layout: 'default',
      helpersPath: this.helpersLocations(),
      partialsPath: this.partialsLocations(),
      isCached: Config.get('app.env') === 'production',
      context: {
        title: Config.get('app.name')
      }
    })
  }

  viewsResourcePath() {
    return __resourcePath('views')
  }

  viewPaths() {
    const views = this.viewsResourcePath()

    // eslint-disable-next-line
    return [
      views,
      Path.resolve(views, 'vendor', 'boost')
    ]
  }

  layoutLocations() {
    const views = this.viewsResourcePath()

    // eslint-disable-next-line
    return [
      Path.resolve(views, 'layouts'),
      Path.resolve(views, 'vendor', 'boost', 'layouts')
    ]
  }

  helpersLocations() {
    const views = this.viewsResourcePath()

    // eslint-disable-next-line
    return [
      Path.resolve(views, 'helpers'),
      Path.resolve(views, 'vendor', 'boost', 'helpers')
    ]
  }

  partialsLocations() {
    const views = this.viewsResourcePath()

    // eslint-disable-next-line
    return [
      Path.resolve(views, 'partials'),
      Path.resolve(views, 'vendor', 'boost', 'partials')
    ]
  }
}

module.exports = new Views()
