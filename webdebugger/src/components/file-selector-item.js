import React from 'react'
import cx from 'classnames'
import { splitFilePath } from '../util/path'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this

const FILE_LABEL_MAX_LENGTH = 30

function trimLabel (string, maxLength) {
  return string > maxLength ? '...' + string.substr(-maxLength + 3) : string
}

const propTypes = {
  commonPath: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  file: PropTypes.object.isRequired,
  onFileSelect: PropTypes.func.isRequired
}

function FileSelectorItem ({ file, index, commonPath, isSelected, onFileSelect }) {
  const className = cx('clickable', 'selectable', isSelected && 'selected')
  const pathToFile = file.path.replace(commonPath, '')
  const label = trimLabel(pathToFile, FILE_LABEL_MAX_LENGTH)
  const { basename, path } = splitFilePath(label)

  const firstSnapshot = file.snapshots[ 0 ]
  const lastSnapshot = file.snapshots[ file.snapshots.length -1 ]
  const processingTime = lastSnapshot.timestamp - firstSnapshot.timestamp
  const initialContentSize = firstSnapshot.content.length

  return (
    <li key={index} className={className} onClick={() => onFileSelect(file)} title={file.path}>
      <div className="file__icon">
        <img src="./assets/file_icon.svg" /> <br />
        <span className="file__size">{Math.round(initialContentSize / 100) / 10} kB</span>
      </div>
      <div className="file__block_info">
        <span className="file__basename">{basename}</span>
        <span className="file__path">{file.path}</span>
        <div className="file__all_timer">
          <div className="file__icon_timer">
            <img className="icon_timer" src="./assets/time_icon.svg" />
            <span className="time_text">{processingTime} ms</span>
          </div>
        </div>
      </div>
      <div className="file__action">
        <img className="file__action_triangle_right" src="./assets/triangle_right.svg" />
      </div>
    </li>
  )
}

FileSelectorItem.propTypes = propTypes

export default FileSelectorItem
