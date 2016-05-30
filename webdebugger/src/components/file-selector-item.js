import React from 'react'
import cx from 'classnames'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this

const FILE_LABEL_MAX_LENGTH = 30

function splitFilePath (filePath) {
  const lastSlashIndex = filePath.lastIndexOf('/')

  if (lastSlashIndex >= 0) {
    return {
      basename: filePath.substr(lastSlashIndex + 1),
      path: filePath.substr(0, lastSlashIndex + 1)
    }
  } else {
    return { basename: filePath, path: '' }
  }
}

const propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  file: PropTypes.object.isRequired,
  onFileSelect: PropTypes.func.isRequired
}

const FileSelectorItem = ({ file, index, isSelected, onFileSelect }) => {
  const className = cx('clickable', 'selectable', isSelected && 'selected')
  const label = file.path.length > FILE_LABEL_MAX_LENGTH ? '...' + file.path.substr(-FILE_LABEL_MAX_LENGTH + 3) : file.path
  const { basename, path } = splitFilePath(label)

  return (
    <li key={index} className={className} onClick={() => onFileSelect(file)}>
      <span className="file__path">{path}</span><span className="file__basename">{basename}</span>
    </li>
  )
}

FileSelectorItem.propTypes = propTypes

export default FileSelectorItem
