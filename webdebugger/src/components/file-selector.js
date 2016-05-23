import { html, mount } from '../dom'
import snapshotsContainer from './snapshots-container'

class FileSelector {
  /**
   * @param {Element} element
   */
  constructor (element) {
    this.element = element
    this.selectedFile = null
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
      <ul class="file-selector">
        ${this.files.map(file => this._renderFile(file))}
      </ul>
      `,
    this.element)
  }

  /**
   * @param {object} file   File object as in `window.postcssDebug`.
   */
  _renderFile (file) {
    const className = 'clickable selectable' + (this.selectedFile === file ? ' selected' : '')

    return html`
      <li class=${className} onclick=${this._onFileSelect.bind(this, file)}>
        <span class="file__title">${file.path}</span>
      </li>`
  }

  /**
   * @param {object} file   File object as in `window.postcssDebug`.
   */
  _onFileSelect (file) {
    this.selectedFile = file
    this._render()
    snapshotsContainer.show(file.snapshots)
  }
}

export default new FileSelector(document.getElementById('file-selector'))
