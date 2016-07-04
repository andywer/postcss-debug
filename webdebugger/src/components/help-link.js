import React from 'react'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this

const propTypes = {
  plugin: PropTypes.string.isRequired
}

function HelpLink ({ plugin }) {
  if (!plugin) {
    return <a className="help-link"></a>
  }

  const url = `https://www.npmjs.com/package/${plugin}`

  return (
    <a className="help-link" href={url} target="_blank">{url}</a>
  )
}

HelpLink.propTypes = propTypes

export default HelpLink
