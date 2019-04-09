import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

// import project components
import SongBoxGrid from '../components/SongBoxGrid'
import Carousel from '../components/Carousel'
import coverArt from '../img/albumArt.png'
import coverArtTwo from '../img/tameImpala.jpg'

//import css scripts
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { dbGetSongs } from '../store/actions/songActions'

const styles = {
  root: {
    width: 1100,
    margin: 'auto',
  },
  centerCol: {
    width: '76%',
    margin: 'auto'
  },
  slider: {
    position: 'relative',
    bottom: 10,
    backgroundColor: 'lightgrey',
    width: '90%',
    zIndex: 3,
    margin: 'auto'
  },
  
}

export class Homepage extends Component {
  componentWillMount() {
    this.props.loadDataStream()
  }
  render() {
    const { classes } = this.props
    const songs = {
      '1': {
        artist: 'Artist 1',
        title: 'song 1',
        coverArt: coverArt
      },
      '2': {
        artist: 'Tame Impala',
        title: 'The Moment',
        coverArt: coverArtTwo
      },
      '3': {
        artist: 'Artist 3',
        title: 'song 3',
        coverArt: coverArt
      },
      '4': {
        artist: 'Artist 4',
        title: 'song 4',
        coverArt: coverArtTwo
      },
      '5': {
        artist: 'Artist 5',
        title: 'song 5',
        coverArt: coverArt
      },
      '6': {
        artist: 'Artist 6',
        title: 'song 6',
        coverArt: coverArt
      },
      '7': {
        artist: 'Artist 7',
        title: 'song 7',
        coverArt: coverArtTwo
      },
      '8': {
        artist: 'Artist 8',
        title: 'song 8',
        coverArt: coverArt
      },
    }
    return (
      <div className={classes.root}>
        <Carousel songs={songs}/>
        <h1 style={{position: 'relative', right: '40%', top: 10}}>Recent</h1>
        <div className={classes.centerCol}>
          <SongBoxGrid songs={songs}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    loadDataStream: () => dispatch(dbGetSongs()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Homepage))
