'use strict'

const Path = require('path')

global.__appRoot = Path.resolve(__dirname, '..')
global.__storagePath = Path.resolve(__appRoot, 'storage')

/**
 * Simplify imports with a global function that
 * imports local modules starting from project's
 * root path.
 *
 * @example
 * ```js
 * const { User } = frequire('app/models')
 * const { Logger } = frequire('boost/utils/logger')
 * ```
 */
global.frequire = (...path) => require(Path.resolve(__appRoot, ...path))

/**
 * Shorthand functions to quickly import
 * utilities.
 *
 * @param {*} path
 */
global.util = (...path) => frequire('boost', 'utils', ...path)
