'use strict'

const Path = require('path')
const Fs = util('filesystem')
const pluginPath = Path.resolve(__appRoot, 'app', 'web')

/**
 * Register your hapi application plugins here.
 */
async function loadAppPlugins () {
  const plugins = await Fs.readDir(pluginPath)

  return plugins.map(plugin => {
    return {
      plugin: require(Path.resolve(pluginPath, plugin))
    }
  })
}

module.exports = loadAppPlugins
