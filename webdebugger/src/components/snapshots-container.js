import React from 'react'
import cx from 'classnames'
import Snapshot from './snapshot'

const { Component, PropTypes } = React    // rollup doesn't resolve that correctly when importing like this

const propTypes = {
  snapshots: PropTypes.array,
  openSnapshots: PropTypes.object,
  onSnapshotToggle: PropTypes.func.isRequired
}

export default class SnapshotsContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchFieldValue: ''
    }
  }

  render () {
    const { openSnapshots, onSnapshotToggle } = this.props
    const { searchFieldValue } = this.state

    let snapshots = this.props.snapshots.map(
      (snapshot, index) => this._prepareSnapshotData(snapshot, this.props.snapshots, index)
    )

    if (searchFieldValue) {
      snapshots = snapshots.filter(snapshot => snapshot.prevPlugin && snapshot.prevPlugin.indexOf(searchFieldValue) >= 0)
    }

    return (
      <ul className="snapshots__view">
        <div className="search__block">
          <img className="search_icon" src="./assets/logo_search.svg" />
          <input
            type="text" className="search__block_input" placeholder="Search your plugins"
            onChange={event => this._onSearchFieldChange(event.target.value)}
          />
        </div>
        {snapshots.map((snapshot, index) =>
          <Snapshot
            key={index} isExpanded={openSnapshots[ index ]}
            onSnapshotToggle={onSnapshotToggle}
            {...{ index, snapshot }}
          />
        )}
      </ul>
    )
  }

  _onSearchFieldChange (searchFieldValue) {
    this.setState({ searchFieldValue })
  }

  _prepareSnapshotData (snapshot, snapshots, index) {
    return {
      timeDiff: index === 0 ? 0 : snapshot.timestamp - snapshots[ index - 1 ].timestamp,
      prevPlugin: snapshot.prevPlugin,
      highlightedContentHTML: snapshot.highlightedContentHTML,
      content: snapshot.content
    }
  }
}

SnapshotsContainer.propTypes = propTypes
