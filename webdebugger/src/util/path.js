const PATH_SEPARATOR_REGEX = /\/|\\/g

/**
 * @param {string} filePath
 * @return {object} splittedPath    { basename: string, path: string }
 */
export function splitFilePath (filePath) {
  const lastSlashIndex = Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\'))

  if (lastSlashIndex >= 0) {
    return {
      basename: filePath.substr(lastSlashIndex + 1),
      path: filePath.substr(0, lastSlashIndex + 1)
    }
  } else {
    return { basename: filePath, path: '' }
  }
}

/**
 * @param {string[]} paths
 * @return string
 */
export function getCommonPath (paths) {
  if (paths.length === 0) { return '' }

  const firstPath = paths.shift()
  let firstPathSplits = splitFilePath(firstPath).path.split(PATH_SEPARATOR_REGEX)

  const commonPath = paths.reduce((lastCommonPathSplits, path) => {
    const commonPathSplits = []
    const thisPathFragments = splitFilePath(path).path.split(PATH_SEPARATOR_REGEX)

    lastCommonPathSplits.some((pathFragment, index) => {
      if (index < thisPathFragments.length && pathFragment === thisPathFragments[ index ]) {
        commonPathSplits.push(pathFragment)
      } else {
        // stop iteration
        return true
      }
    })

    return commonPathSplits
  }, firstPathSplits).join('/')

  return commonPath && !commonPath.match(/\/$/) ? commonPath + '/' : commonPath
}
