'use strict'

const ViewCompiler = util('view/compiler')

class RenderViews {
  constructor () {
    this.compiler = new ViewCompiler()
  }

  async render (template, data = {}) {
    return this.compiler.render(template, data)
  }
}

module.exports = RenderViews
