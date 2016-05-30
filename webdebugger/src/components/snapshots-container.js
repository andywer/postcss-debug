import React from 'react'
import cx from 'classnames'
import './snapshots-container.css'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this

const propTypes = {
  snapshots: PropTypes.array,
  openSnapshots: PropTypes.object,
  onSnapshotToggle: PropTypes.func.isRequired
}

export default class SnapshotsContainer extends Component {
  render () {
    const snapshots = this.props.snapshots.map(
      (snapshot, index) => this._prepareSnapshotData(snapshot, this.props.snapshots, index)
    )

    return (
      <ul className="snapshots">
        {snapshots.map((snapshot, index) => this._renderSnapshot(snapshot, index))}
      </ul>
    )
  }

  /**
   * @param {object} snapshot     Snapshot object as in `window.postcssDebug`.
   */
  _renderSnapshot (snapshot, index) {
    const isExpanded = this.props.openSnapshots[ index ]
    const benchmark = index > 0
      ? <span className="snapshot__timing">took {snapshot.timeDiff}ms</span>
      : null

    return (
      <li key={index} className={cx('selectable ', isExpanded && 'selected')}>
        <h3 className="snapshot__heading clickable" onClick={this.props.onSnapshotToggle.bind(this, index)}>
          <span className="snapshot__after-plugin">{snapshot.afterPluginLabel}</span>
          {index > 0 ? benchmark : null}
        </h3>
        {this._renderSnapshotContent(snapshot)}
      </li>
    )
  }

  _renderSnapshotContent (snapshot) {
    if (snapshot.highlightedContentHTML) {
      const innerHTML = { __html: snapshot.highlightedContentHTML }
      return <div className="snapshot__content" dangerouslySetInnerHTML={innerHTML}></div>
    } else {
      return <pre className="snapshot__content">{snapshot.content}</pre>
    }
  }

  _prepareSnapshotData (snapshot, snapshots, index) {
    return {
      timeDiff: index === 0 ? 0 : snapshot.timestamp - snapshots[ index - 1 ].timestamp,
      afterPluginLabel: snapshot.prevPlugin ? `After ${snapshot.prevPlugin}` : 'Initially',
      highlightedContentHTML: snapshot.highlightedContentHTML,
      content: snapshot.content
    }
  }
}

SnapshotsContainer.propTypes = propTypes
