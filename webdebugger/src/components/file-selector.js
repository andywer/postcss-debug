import cx from 'classnames'
import React from 'react'
import SnapshotsContainer from './snapshots-container'
import './file-selector.css'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this
const FILE_LABEL_MAX_LENGTH = 30

const propTypes = {
  files: PropTypes.array.isRequired
}

export default class FileSelector extends Component {
  /**
   * @param {Element} element
   */
  constructor (props) {
    super(props)

    this.state = {
      selectedFile: null,
      openSnapshots: {}
    }
  }

  render () {
    const { files } = this.props
    const { selectedFile } = this.state

    return (
      <div>
        <h5>Files</h5>
        <ul className="file-selector">
          {files.map((file, index) => this._renderFile(file, index))}
        </ul>
        <SnapshotsContainer
          snapshots={selectedFile ? selectedFile.snapshots : []}
          openSnapshots={this.state.openSnapshots}
          onSnapshotToggle={this._onSnapshotToggle.bind(this)}
        />
      </div>
    )
  }

  /**
   * @param {object} file   File object as in `window.postcssDebug`.
   * @param {number} index  Index of file object in files array.
   */
  _renderFile (file, index) {
    const { selectedFile } = this.state
    const className = cx('clickable', 'selectable', selectedFile === file && 'selected')
    const label = file.path.length > FILE_LABEL_MAX_LENGTH ? '...' + file.path.substr(-FILE_LABEL_MAX_LENGTH + 3) : file.path

    return (
      <li key={index} className={className} onClick={this._onFileSelect.bind(this, file)}>
        <span className="file__title">{label}</span>
      </li>
    )
  }

  /**
   * @param {object} file   File object as in`window.postcssDebug`.
   */
  _onFileSelect (selectedFile) {
    this.setState({ selectedFile })
  }

  /**
   * @param {number} snapshotIndex  Index of the snapshot inside the snapshot array.
   */
  _onSnapshotToggle (snapshotIndex) {
    const openSnapshots = this.state.openSnapshots

    this.setState({
      openSnapshots: Object.assign({}, openSnapshots, { [ snapshotIndex ]: !openSnapshots[ snapshotIndex ] })
    })
  }
}

FileSelector.propTypes = propTypes
