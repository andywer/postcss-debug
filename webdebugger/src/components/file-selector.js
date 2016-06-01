import React from 'react'
import FileSelectorItem from './file-selector-item'
import SnapshotsContainer from './snapshots-container'
import { getCommonPath } from '../util/path'
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
      searchFieldValue: '',
      selectedFile: null,
      openSnapshots: {}
    }
  }

  render () {
    const { files } = this.props
    const { selectedFile } = this.state

    return (
      <div className="main_container">
        <div className="file-selector">
          <h3>Your files <span className="counter">{files.length}</span></h3>
          <div className="search_block">
            <input
              type="text" className="search_block_input" placeholder="Search your file"
              onChange={event => this._onSearchFieldChange(event.target.value)}
              />
          </div>
          <ul className="file-selector-list">
            {this._renderFiles()}
          </ul>
        </div>
        <SnapshotsContainer
          snapshots={selectedFile ? selectedFile.snapshots : []}
          openSnapshots={this.state.openSnapshots}
          onSnapshotToggle={this._onSnapshotToggle.bind(this)}
        />
      </div>
    )
  }

  _renderFiles () {
    const { searchFieldValue, selectedFile } = this.state
    let { files } = this.props

    if (searchFieldValue) {
      files = files.filter(file => file.path.indexOf(searchFieldValue) >= 0)
    }

    const commonPath = getCommonPath(files.map(file => file.path))

    return files.map((file, index) =>
      <FileSelectorItem
        key={index} isSelected={selectedFile === file} commonPath={commonPath}
        onFileSelect={this._onFileSelect.bind(this)}
        {...{ index, file }}
      />
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
   * @param {string} searchFieldValue   New value of the search field.
   */
  _onSearchFieldChange (searchFieldValue) {
    this.setState({ searchFieldValue })
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
