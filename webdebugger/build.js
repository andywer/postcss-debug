'use strict'

var fs = require('fs')
var path = require('path')

var destFilePath = path.join(__dirname, '/build/index.html')
var html = fs.readFileSync(path.join(__dirname, '/src/index.html'), { encoding: 'utf8' })

/**
 * @param {object} fileSnapshotsData  { files: object[] }   (see dev/sample-data.js for sample data)
 */
function prepareIndexHtml (fileSnapshotsData) {
  fs.writeFileSync(destFilePath, html.replace('/* DEBUG_SNAPSHOTS */', fileSnapshotsData))

  return destFilePath
}

exports.prepareIndexHtml = prepareIndexHtml
