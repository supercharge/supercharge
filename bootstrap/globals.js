'use strict'

const Path = require('path')

// simplify imports with a global function that
// imports local modules starting from project's root path
// ! NO   require(Path.resolve('../../../utils/logger'))
// ? OK   require(Path.resolve(__appRoot, 'utils', 'logger')
// ? OK   require(`${__appRoot}/utils/logger`)
// * YES  frequire('utils', 'logger')
// * YES  frequire('utils/logger')
global.__appRoot = Path.resolve(__dirname, '..')
global.frequire = (...path) => require(Path.resolve(__appRoot, ...path))

global.model = (...path) => require(Path.resolve(__appRoot, 'app', 'models', ...path))
global.util = (...path) => require(Path.resolve(__appRoot, 'utils', ...path))
