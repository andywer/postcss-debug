import postcss from 'postcss'
import DefaultLogger from './logger'
import Snapshot from './snapshot'

export default class PostcssDebugger {
  constructor (matchers, options) {
    this.matchers = matchers;
    this.options = Object.assign({ logger: new DefaultLogger() }, options)

    this.snapshots = new Map()    // key: <file>, value: Array<Snapshot>
    this.inspect = this.inspect.bind(this)
  }

  createSnapshoter ({ prevPlugin, nextPlugin }) {
    return postcss.plugin('postcss-debug-snapshot', () => (
      css => {
        this.createSnapshot(css, prevPlugin, nextPlugin)
      }
    ))
  }

  createSnapshot (css, prevPlugin, nextPlugin) {
    const filePath = css.source.input.file

    if (this.shouldTrackFile(filePath)) {
      const newSnapshot = new Snapshot(css, { prevPlugin, nextPlugin })

      this.snapshots.set(filePath,
        (this.snapshots.get(filePath) || []).concat([ newSnapshot ])
      )
    }
  }

  inspect () {
    this.options.logger.inspect(this.snapshots, this.options)
  }

  shouldTrackFile (filePath) {
    return this.matchers.some(matcher => matcher(filePath))
  }
}
