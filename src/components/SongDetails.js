
import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import SvgShare from '@material-ui/icons/Share'
import SvgComment from '@material-ui/icons/Comment'
import SvgFavorite from '@material-ui/icons/Favorite'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import SvgFavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { grey } from '@material-ui/core/colors'
import Paper from '@material-ui/core/Paper'
import Menu from '@material-ui/core/Menu'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import Grow from '@material-ui/core/Grow'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Zoom from '@material-ui/core/Zoom'
import styled from "@emotion/styled/macro";
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'

import { dbDeleteSong } from '../store/actions/songActions'

const styles = (theme) => ({
  textField: {
    minWidth: 280,
    marginTop: 20
  },
  contain: {
    margin: '0 auto'
  },
  titleFrame: {
    position: 'relative',
    top: 10,
    left: 10,
    width: 255,
  },
  coverArtFrame: {
    position: 'relative',
    left: 95,
    bottom: 90,
    maxHeight: 70,
    width: 70,
    backgroundColor: 'grey'
  },
  myStats: {
    position: 'relative',
    bottom: 70,
    right: 80

  },
  title: {

  },
  artist: {

  },
  offerList: {
    position: 'relative',
    bottom: 95,
    right: 135
  },
  paper: {
    height: 420,
    width: 450,
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  },
  deleteButton: {
    backgroundColor: 'lightgrey',
    "&:hover": {
        backgroundColor: "grey !important"
      },
    position: 'relative',
    left: 90,
    bottom: 27,
}
})

class SongDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        loaded: false, 
    }
  }

  render() {
    const {deleteSong, songId, song, classes, theme, auth} = this.props
    const title = song['title']
    const artist = song['artistName']
    const coverArt = song['imageUrl']
    const media = song['songUrl']
    const ownerDetails = song['ownerDetails'] 

    const cardSize = 130
    const titleSize = 14
    const subtitleSize = 12
    const iconSize = 30

    console.log('song Details props: ', this.props)
    console.log('song ownerDetails', song['ownerDetails'] )
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} className={classes.contain}>
          <div>
            <Paper className={classes.paper} elevation={1} >
            <div className={classes.titleFrame}>
            <h2 className={classes.title}>{title}</h2>
            <h4 className={classes.artist}>{artist}</h4>
            </div>
            <hr />
            <img className={classes.coverArtFrame} src={coverArt}></img>
            <div className={classes.myStats}>
              {(auth && ownerDetails && ownerDetails[auth.uid]) ? <Typography> You own {ownerDetails[auth.uid].percentOwned}% </Typography> : ''}
              {(auth && ownerDetails && ownerDetails[auth.uid] && ownerDetails[auth.uid].percentOwned === 100) ? <Button className={classes.deleteButton} onClick={() => deleteSong(songId)}>Delete</Button> : ''}
            </div>
            <div className={classes.offerList}>
              <h3> Current Offers: </h3>
              <div>
              </div>
            </div>
            </Paper>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
      deleteSong: (songId) => dispatch(dbDeleteSong(songId)),
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(SongDetails))
