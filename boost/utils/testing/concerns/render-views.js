'use strict'

const Launch = frequire('start')

class RenderViews {
  constructor () {
    this.compiler = null
  }

  async init () {
    const launch = new Launch()
    await launch.warmUpCore()
    await launch.configureViews()

    this.compiler = launch.server.realm.plugins.vision.manager._engines.hbs.module
  }

  async compile (template) {
    if (!this.compiler) {
      await this.init()
    }

    return this.compiler.compile(template)
  }

  async render (template, data) {
    if (!this.compiler) {
      await this.init()
    }

    const renderFunction = await this.compile(template)

    return renderFunction(data)
  }
}

module.exports = RenderViews
