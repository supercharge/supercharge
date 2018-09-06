'use strict'

const Path = require('path')
const __appRoot = Path.resolve(__dirname, '..')
const Globals = require(Path.resolve(__appRoot, 'start', 'globals'))

/**
 * Register custom Node.js globals before launching
 * the tests. Boost and probably your app might
 * use globals to quickly access project files.
 */
new Globals().fromAppRoot(__appRoot)
