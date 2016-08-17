import React from 'react'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this

const propTypes = {
  plugin: PropTypes.string.isRequired
}

/**
 * Plugin help component. Creates a link to a PostCSS plugin's documentation.
 */
function HelpLink ({ plugin }) {
  if (!plugin) {
    return null
  }

  const href = `https://www.npmjs.com/package/${plugin}`
  return <a className="snapshot__helper" target="_blank" href={href}>?</a>
}

HelpLink.propTypes = propTypes

export default HelpLink
