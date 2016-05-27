import { html, mount } from '../dom'

export default class SnapshotsContainer {
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
    this.snapshots = snapshots.map((snapshot, index) => this._prepareSnapshotData(snapshot, snapshots, index))
    this._render()
  }

  _render () {
    mount(html`
      <ul class="snapshots">
        ${this.snapshots.map((snapshot, index) => this._renderSnapshot(snapshot, index))}
      </ul>
      `,
    this.element)
  }

  /**
   * @param {object} snapshot     Snapshot object as in `window.postcssDebug`.
   */
  _renderSnapshot (snapshot, index) {
    const benchmark = index > 0 ? html`
      <span class="snapshot__timing">took ${snapshot.timeDiff}ms</span>
    ` : null

    return html`
      <li class=${'selectable ' + (snapshot.expanded ? 'selected' : '')}>
        <h3 class="clickable" onclick=${this._onSnapshotToggle.bind(this, snapshot)}>
          <span class="snapshot__after-plugin">${snapshot.afterPluginLabel}</span>
          ${index > 0 ? benchmark : null}
        </h3>
        ${this._renderSnapshotContent(snapshot)}
      </li>`
  }

  _renderSnapshotContent (snapshot) {
    if (snapshot.highlightedContentHTML) {
      const contentDomNode = html`<div class="snapshot__content"></div>`
      contentDomNode.innerHTML = snapshot.highlightedContentHTML

      return contentDomNode
    } else {
      return html `
        <pre class="snapshot__content">${snapshot.content}</pre>
      `
    }
  }

  _prepareSnapshotData (snapshot, snapshots, index) {
    return {
      expanded: false,
      timeDiff: index === 0 ? 0 : snapshot.timestamp - snapshots[ index - 1 ].timestamp,
      afterPluginLabel: snapshot.prevPlugin ? `After ${snapshot.prevPlugin}` : 'Initially',
      highlightedContentHTML: snapshot.highlightedContentHTML,
      content: snapshot.content
    }
  }

  _onSnapshotToggle (snapshot) {
    snapshot.expanded = !snapshot.expanded
    this._render()
  }
}
