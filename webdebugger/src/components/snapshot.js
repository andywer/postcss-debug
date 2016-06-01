import React from 'react'
import cx from 'classnames'
import './snapshot.css'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this

const propTypes = {
  index: PropTypes.number.isRequired,
  isExpanded: PropTypes.bool,
  snapshot: PropTypes.object.isRequired,
  onSnapshotToggle: PropTypes.func.isRequired
}

const Snapshot = ({ snapshot, index, isExpanded, onSnapshotToggle }) => {
  function renderSnapshotContent (snapshot) {
    if (snapshot.highlightedContentHTML) {
      const innerHTML = { __html: snapshot.highlightedContentHTML }
      return <div className="snapshot__content" dangerouslySetInnerHTML={innerHTML}></div>
    } else {
      return <pre className="snapshot__content">{snapshot.content}</pre>
    }
  }

  const benchmark = index > 0
    ? <span className="snapshot__timing">{snapshot.timeDiff}ms</span>
    : null

  return (
    <li className={cx('selectable ', isExpanded && 'selected')}>
      <h3 className="snapshot__heading clickable" onClick={() => onSnapshotToggle(index)}>
        <span className="snapshot__after-plugin">{snapshot.afterPluginLabel}</span>
        {index > 0 ? benchmark : null}
        <a className="help-link" href="https://github.com/andywer/postcss-debug/issues/1" target="_blank"><span className="counter">?</span></a>
      </h3>
      {renderSnapshotContent(snapshot)}
    </li>
  )
}

Snapshot.propTypes = propTypes

export default Snapshot
