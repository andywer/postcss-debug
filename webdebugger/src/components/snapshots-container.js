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
    this.snapshots = snapshots.map(snapshot => this._prepareSnapshotData(snapshot, snapshots))
    this._render()
  }

  _render () {
    mount(html`
      <ul class="snapshots">
        ${this.snapshots.map(snapshot => this._renderSnapshot(snapshot))}
      </ul>
      `,
    this.element)
  }

  /**
   * @param {object} snapshot     Snapshot object as in `window.postcssDebug`.
   */
  _renderSnapshot (snapshot) {
    return html`
    <li class=${'selectable ' + (snapshot.expanded ? 'selected' : '')}>
      <h3 class="clickable" onclick=${this._onSnapshotToggle.bind(this, snapshot)}>
        <span class="snapshot__after-plugin">${snapshot.afterPluginLabel}</span>
        <span class="snapshot__relative-time">@${snapshot.relativeTime}ms</span>
      </h3>
      <pre class="snapshot__content">${snapshot.content.replace(/^\n/, '')}</pre>
    </li>`
  }

  _prepareSnapshotData (snapshot, snapshots) {
    return {
      expanded: false,
      relativeTime: snapshot.timestamp - snapshots[0].timestamp,
      afterPluginLabel: snapshot.prevPlugin ? `After ${snapshot.prevPlugin}` : 'Initially',
      content: snapshot.content
    }
  }

  _onSnapshotToggle (snapshot) {
    snapshot.expanded = !snapshot.expanded
    this._render()
  }
}

debugger
export default new SnapshotsContainer(document.getElementById('snapshots'))
