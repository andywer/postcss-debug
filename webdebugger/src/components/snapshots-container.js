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
    const afterPluginLabel = snapshot.prevPlugin ? `After ${snapshot.prevPlugin}` : 'Initially'

    return html`
    <li>
      <span class="after-plugin">${afterPluginLabel}</span>
      <pre class="snapshot-content">${snapshot.content.replace(/^\n/, '')}</pre>
    </li>`
  }
}

debugger
export default new SnapshotsContainer(document.getElementById('snapshots'))
