function getPluginName (plugin) {
  if (plugin.postcss) {
    plugin = plugin.postcss
  }

  return plugin.postcssPlugin
}

export default class Snapshot {
  constructor (css, { prevPlugin, nextPlugin }) {
    this.css = css.toString()
    this.timestamp = Date.now()
    this.prevPlugin = prevPlugin && getPluginName(prevPlugin)
    this.nextPlugin = nextPlugin && getPluginName(nextPlugin)
  }

  isFirstSnapshot () {
    return !this.prevPlugin
  }

  isLastSnapshot () {
    return !this.nextPlugin
  }
}
