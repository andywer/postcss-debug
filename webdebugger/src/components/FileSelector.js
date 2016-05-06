import { html, mount } from '../dom'

class FileSelector {
  constructor (element) {
    this.element = element
  }

  show (files) {
    mount(html`
      <ul class="file-selector">
        ${files.map(file => this._renderFile(file))}
      </ul>
      `,
    this.element)
  }

  _renderFile (file) {
    return html`
      <li onclick=${this._onFileSelect.bind(this, file)}>
        <span class="file__title">${file.path}</span>
      </li>`
  }

  _onFileSelect (file) {
    // TODO
  }
}

export default new FileSelector(document.getElementById('file-selector'))
