import React from 'react'
import FileSelectorItem from './file-selector-item'
import SnapshotsContainer from './snapshots-container'
import './file-selector.css'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this

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
        <ul className="file-selector">
          {files.map((file, index) =>
            <FileSelectorItem
              key={index} isSelected={selectedFile === file}
              onFileSelect={this._onFileSelect.bind(this)}
              {...{ index, file }}
            />
          )}
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
   * @param {object} file   File object as in`window.postcssDebug`.
   */
  _onFileSelect (selectedFile) {
    this.setState({
      selectedFile,
      openSnapshots: {}
    })
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
