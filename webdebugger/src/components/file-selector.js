import { html, mount } from '../dom'
import snapshotsContainer from './snapshots-container'

class FileSelector {
  /**
   * @param {Element} element
   */
  constructor (element) {
    this.element = element
  }

  /**
   * @param {object[]} files    Array of file objects as in `window.postcssDebug`.
   */
  show (files) {
    mount(html`
      <ul class="file-selector">
        ${files.map(file => this._renderFile(file))}
      </ul>
      `,
    this.element)
  }

  /**
   * @param {object} file   File object as in `window.postcssDebug`.
   */
  _renderFile (file) {
    return html`
      <li onclick=${this._onFileSelect.bind(this, file)}>
        <span class="file__title">${file.path}</span>
      </li>`
  }

  /**
   * @param {object} file   File object as in `window.postcssDebug`.
   */
  _onFileSelect (file) {
    snapshotsContainer.show(file.snapshots)
  }
}

export default new FileSelector(document.getElementById('file-selector'))
