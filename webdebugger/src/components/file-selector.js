import { html, mount } from '../dom'
import SnapshotsContainer from './snapshots-container'

const FILE_LABEL_MAX_LENGTH = 30

class FileSelector {
  /**
   * @param {Element} element
   */
  constructor (element) {
    this.element = element
    this.selectedFile = null
    this.snapshotsContainer = null
  }

  /**
   * @param {object[]} files    Array of file objects as in `window.postcssDebug`.
   */
  show (files) {
    this.files = files
    this._render()
  }

  _render () {
    mount(html`
      <div>
        <h5>Files</h5>
        <ul class="file-selector">
          ${this.files.map(file => this._renderFile(file))}
        </ul>
        ${this._renderSnapshots()}
      </div>
      `,
    this.element)

    this.snapshotsContainer = new SnapshotsContainer(document.getElementById('snapshots'))
  }

  _renderSnapshots () {
    if (!this.selectedFile) { return null }

    return html`
      <div>
        <hr />
        <section id="snapshots"></section>
      </div>
    `
  }

  /**
   * @param {object} file   File object as in `window.postcssDebug`.
   */
  _renderFile (file) {
    const className = 'clickable selectable' + (this.selectedFile === file ? ' selected' : '')
    const label = file.path.length > FILE_LABEL_MAX_LENGTH ? '...' + file.path.substr(-FILE_LABEL_MAX_LENGTH + 3) : file.path

    return html`
      <li class=${className} onclick=${this._onFileSelect.bind(this, file)}>
        <span class="file__title">${label}</span>
      </li>`
  }

  /**
   * @param {object} file   File object as in `window.postcssDebug`.
   */
  _onFileSelect (file) {
    this.selectedFile = file
    this._render()
    this.snapshotsContainer.show(file.snapshots)
  }
}

export default new FileSelector(document.getElementById('file-selector'))
