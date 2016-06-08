import React from 'react'
import ReactDOM from 'react-dom'
import FileSelector from './components/file-selector'
import { setupKeyListener } from './theming'
import './styles.css'
import './dark-theme.css'

setupKeyListener()

const { files } = window.postcssDebug

ReactDOM.render(
  <FileSelector files={files} />,
  document.getElementById('file-selector')
)
