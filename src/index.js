import Debugger from './debugger'
import * as matcher from './matchers'

export { matcher }

export function createDebugger (matchers = [], options = {}) {
  if (matchers.length === 0) {
    matchers = [ matcher.all() ]
  }

  const postcssDebugger = new Debugger(matchers, options)

  function debugPostCSS (postcss) {
    if (Array.isArray(postcss)) {
      // `postcss` is an array of plugins (`postcss(debug([ plugin1, plugin2, ... ]))`)
      return pluginWrapper(postcss)
    } else if (typeof postcss === 'object' && postcss.constructor.name === 'Processor' && postcss.plugins) {
      // `postcss` is a postcss processor instance (`debug(postcss([ plugin1, plugin2, ... ]))`)
      return new postcss.constructor(pluginWrapper(postcss.plugins))
    } else {
      console.error('Unrecognized parameter passed to postcss-debug. Expected postcss instance or array of plugins.')
      return postcss
    }
  }

  function pluginWrapper (plugins) {
    if (plugins.length === 0) {
      return [ postcssDebugger.createSnapshoter({}) ]
    }

    const pluginsAndSnapshotters = []
    let prevPlugin = null

    plugins.forEach(plugin => {
      pluginsAndSnapshotters.push(postcssDebugger.createSnapshoter({ prevPlugin, nextPlugin: plugin }))
      pluginsAndSnapshotters.push(plugin)
      prevPlugin = plugin
    })

    pluginsAndSnapshotters.push(postcssDebugger.createSnapshoter({ prevPlugin }))

    return pluginsAndSnapshotters;
  }

  return Object.assign(debugPostCSS, postcssDebugger)
}
