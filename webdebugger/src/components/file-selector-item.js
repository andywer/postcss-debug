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

const FileSelectorItem = ({ file, index, commonPath, isSelected, onFileSelect }) => {
  const className = cx('clickable', 'selectable', isSelected && 'selected')
  const pathToFile = file.path.replace(commonPath, '')
  const label = trimLabel(pathToFile, FILE_LABEL_MAX_LENGTH)
  const { basename, path } = splitFilePath(label)

  return (
    <li key={index} className={className} onClick={() => onFileSelect(file)} title={file.path}>
      <div className="file__icon">
      </div>
      <div className="file__block_info">
        <span className="file__basename">{basename}</span><br />
        <span className="file__path">asdasdasdasdas ad asd asd asd ad </span><br />
        <div className="file__all_timer"></div>
      </div>
      <div className="file__action">
      </div>
    </li>
  )
}

FileSelectorItem.propTypes = propTypes

export default FileSelectorItem
