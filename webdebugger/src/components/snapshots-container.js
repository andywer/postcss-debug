import { html, mount } from '../dom'

class SnapshotsContainer {
  /**
   * @param {Element} element
   */
  constructor (element) {
    this.element = element
  }

  /**
   * @param {object[]} snapshots    Array of snapshot objects as in `window.postcssDebug`.
   */
  show (snapshots) {
    snapshots = snapshots.map(snapshot => this._prepareSnapshotData(snapshot, snapshots))

    mount(html`
      <ul class="snapshots">
        ${snapshots.map(snapshot => this._renderSnapshot(snapshot))}
      </ul>
      `,
    this.element)
  }

  /**
   * @param {object} snapshot     Snapshot object as in `window.postcssDebug`.
   */
  _renderSnapshot (snapshot) {
    return html`
    <li>
      <h3>
        <span class="snapshot__after-plugin">${snapshot.afterPluginLabel}</span>
        <span class="snapshot__relative-time">@${snapshot.relativeTime}ms</span>
      </h3>
      <pre class="snapshot__content">${snapshot.content.replace(/^\n/, '')}</pre>
    </li>`
  }

  _prepareSnapshotData (snapshot, snapshots) {
    return {
      relativeTime: snapshot.timestamp - snapshots[0].timestamp,
      afterPluginLabel: snapshot.prevPlugin ? `After ${snapshot.prevPlugin}` : 'Initially',
      content: snapshot.content
    }
  }
}

debugger
export default new SnapshotsContainer(document.getElementById('snapshots'))
