import postcss from 'postcss'
import defaultLogger from './logger'
import * as matcher from './matchers'

export { matcher }

function getPluginName (plugin) {
  if (plugin.postcss) {
    plugin = plugin.postcss
  }

  return plugin.postcssPlugin
}

class Snapshot {
  constructor(css, { prevPlugin, nextPlugin }) {
    this.css = css.clone()
    this.timestamp = Date.now()
    this.prevPlugin = prevPlugin && getPluginName(prevPlugin)
    this.nextPlugin = nextPlugin && getPluginName(nextPlugin)
  }
}

class PostcssDebugger {
  constructor (matchers, options) {
    this.matchers = matchers;
    this.options = Object.assign({ logger: defaultLogger }, options)

    this.snapshots = []
    this.print = this.print.bind(this)
  }

  createSnapshoter ({ prevPlugin, nextPlugin }) {
    return postcss.plugin('postcss-debug-snapshot', () => (
      css => {
        // TODO: Check if css matches any of this.matchers
        this.snapshots.push(new Snapshot(css, { prevPlugin, nextPlugin }))
      }
    ))
  }

  print () {
    this.options.logger.print(this.snapshots, this.options)
  }
}

export function createDebugger (matchers, options = {}) {
  const postcssDebugger = new PostcssDebugger(matchers, options)

  return plugins => {
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
}
