import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom';

// import project components
import SongBoxGrid from '../components/SongBoxGrid'
import Carousel from '../components/Carousel'
import coverArt from '../img/albumArt.png'
import coverArtTwo from '../img/tameImpala.jpg'
import CircularProgress from '@material-ui/core/CircularProgress'
import LandingPage from './LandingPage'
import InfiniteScroll from 'react-infinite-scroller';

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
  constructor (props) {
    super(props)
    this.state = {
      loadIters: 0,
    }
    console.log(this.state);
  }
  scrollLoad = (page) => {
    console.log('scrollLoad')
    const { loadStream } = this.props
    this.props.loadDataStream()
    this.setState({...this.state, loadIters: this.state.loadIters+1})
  }

  componentDidMount() {
    this.props.loadDataStream()
  }

  render() {
    const { classes, auth, song, drizzle, drizzleState } = this.props
    console.log('homepage props: ', this.props)
    console.log('homepage state: ', this.state)
    const songs = song.info;
    const hasMoreData = song.stream.hasMoreData;
    
    if(auth.uid){
      return (
        <div className={classes.root}>
          <Carousel songs={songs} drizzle={drizzle} drizzleState = {drizzleState}/>
          <h1 style={{position: 'relative', right: '40%', top: 10}}>Recent</h1>
          <div className={classes.centerCol}>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.scrollLoad}
              hasMore={(hasMoreData && this.state.loadIters < 10)}
              useWindow={true}
              loader={<div key='load-more-progress'><CircularProgress size={30} thickness={5} style={{color: 'lightblue' }} /></div>}
              >
              <SongBoxGrid songs={songs} drizzle = {drizzle} drizzleState = {drizzleState}/>
            </InfiniteScroll>
          </div>
        </div>
      )
    }
    else{
      return <LandingPage/>
    }
  }
}

const mapStateToProps = (state) => {
    return {
        ...state,
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
