import React from 'react'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this

const propTypes = {
  plugin: PropTypes.string.isRequired
}

const HelpLink = ({ plugin }) => {
  const url = `https://www.npmjs.com/package/${plugin}`

  return (
    <a className="help-link" href={url} target="_blank">
      <span className="counter">?</span>
    </a>
  )
}

HelpLink.propTypes = propTypes

export default HelpLink
