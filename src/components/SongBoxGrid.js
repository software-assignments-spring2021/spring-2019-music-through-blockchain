import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import SongBox from '../components/SongBox'

const styles = theme => ( {
    root: {
    }
})

export class SongBoxGrid extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    const { classes, theme, songs } = this.props
    return (
      <div className={classes.root}>
        {(songs && Object.keys(songs).length > 0) ? Object.keys(songs).map((songId) => (
            <SongBox key={songId} title={songs[songId]['title']} artist={songs[songId]['artistName']} coverArt={songs[songId]['imageUrl']} media={songs[songId]['songUrl']}/>
        )) : ''}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(SongBoxGrid)
