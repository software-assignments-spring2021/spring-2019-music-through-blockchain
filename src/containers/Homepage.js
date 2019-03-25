import React, { Component } from 'react'
import { connect } from 'react-redux'

// import project components
import SongBoxGrid from '../components/SongBoxGrid'
import coverArt from '../img/albumArt.png'
import coverArtTwo from '../img/tameImpala.jpg'

export class Homepage extends Component {
  render() {
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
    }
    return (
      <div>
        <h1>bMusic</h1>
        <SongBoxGrid songs={songs}/>
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

export default connect(mapStateToProps, null)(Homepage)
