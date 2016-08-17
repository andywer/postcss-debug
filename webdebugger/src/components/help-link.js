import React from 'react'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this

const propTypes = {
  plugin: PropTypes.string.isRequired
}

const defaultProps = {
  onClick: () => {}
}

/**
 * Plugin help component. Creates a link to a PostCSS plugin's documentation.
 */
function HelpLink ({ plugin, onClick }) {
  if (!plugin) {
    return null
  }

  const href = `https://www.npmjs.com/package/${plugin}`
  return <a className="snapshot__helper" target="_blank" href={href} onClick={onClick}>?</a>
}

HelpLink.propTypes = propTypes
HelpLink.defaultProps = defaultProps

export default HelpLink
