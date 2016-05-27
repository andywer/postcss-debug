import midas from 'midas'
import opener from 'opener'
import { prepareIndexHtml } from '../webdebugger/build'

function serializeFileSnapshots (fileSnapshots) {
  const files = []

  fileSnapshots.forEach((snapshots, file) => {
    files.push({
      path: file,
      snapshots: snapshots.map(snapshot => serializeSnapshot(snapshot))
    })
  })

  return JSON.stringify({ files })
}

function serializeSnapshot (snapshot) {
  const content = snapshot.css.toString()

  return {
    timestamp: snapshot.timestamp,
    prevPlugin: snapshot.prevPlugin,
    nextPlugin: snapshot.nextPlugin,
    highlightedContentHTML: midas(content).content,
    content
  }
}

export function inspect (fileSnapshots) {
  const htmlFilePath = prepareIndexHtml(serializeFileSnapshots(fileSnapshots))
  opener(htmlFilePath).unref()
}
