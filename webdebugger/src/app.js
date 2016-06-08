import React from 'react'
import ReactDOM from 'react-dom'
import FileSelector from './components/file-selector'
import { init as initTheming } from './theming'
import './styles.css'
import './dark-theme.css'

initTheming()

const { files } = window.postcssDebug

ReactDOM.render(
  <FileSelector files={files} />,
  document.getElementById('file-selector')
)
