
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
import Slider from '@material-ui/lab/Slider';
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
import { Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { withRouter } from "react-router-dom";

import { dbDeleteSong, dbPurchaseSong, dbPutSongForSale, dbRemoveSongForSale } from '../store/actions/songActions'

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
  button: {
    background: "linear-gradient(to right, #647DEE, #7F53AC) !important",
    "&:hover": {
      border: "solid 3px white",
      color: "white !important"
    }, 
    top: 100

  },
  sellArea: {
    margin: 'auto'

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
    top: 27,
    
}
})

class SongDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        loaded: false, 
        percentValue: 1,
        price: null,
        priceInputError: ''
    }
  }

  handleSlider = (event, percentValue) => {
    this.setState({ percentValue });
  };

  handlePriceChange = (event) => {
    const target = event.target
    this.setState({
        price: target.value
    })
  }

  handlePutForSale = () => {
    const { sellSong, song, songId, auth } = this.props
    const ownerDetails = song['ownerDetails'] 
    const {price, percentValue} = this.state
    let sellAllShares = false
    if (ownerDetails[auth.uid].percentOwned === percentValue) {
      sellAllShares = true
    }
    let error = false

    let intPrice = parseInt(price)
    if (isNaN(intPrice)) {
        if (!intPrice || intPrice <= 0) {
            this.setState({
                priceInputError: 'Please enter a valid price'
            })
            error = true
        }
    }

    if (!error) {
      console.log('Putting ', percentValue, 'percent up for sale at $', intPrice, ' per percentage point')
      const callBack = () => {
        this.props.closeModal()
      }
      sellSong(song, songId, percentValue, intPrice, sellAllShares, callBack)
    }
  }

  render() {
    const {deleteSong, songId, song, classes, theme, auth} = this.props
    console.log('opening modal for', song.id)
    const title = song['title']
    const artist = song['artistName']
    const coverArt = song['imageUrl']
    const media = song['songUrl']
    const ownerDetails = song['ownerDetails'] 
    const market = song['market'] 
    const cardSize = 130
    const titleSize = 14
    const subtitleSize = 12
    const iconSize = 30
    const callBack = () => {
      this.props.closeModal()
    }

    console.log('song Details props: ', this.props)
    console.log('song ownerDetails', song['ownerDetails'] )

    return (
      <Grid container spacing={24} style={{overflow: 'hidden'}}>
        <Grid item xs={12} className={classes.contain}>
          <div>
            <Paper className={classes.paper} elevation={1} >
            <div className={classes.titleFrame}>
            <h2 className={classes.title}>{title}</h2>
            <h4 className={classes.artist}>{artist}</h4>
            </div>
            <hr />
            <img className={classes.coverArtFrame} src={coverArt}></img>
            
            {(auth && ownerDetails && ownerDetails[auth.uid]) ?
              (market && market[auth.uid]) 
              ? 
              <div style={{position: 'relative', right: 40, bottom: 60 }}>
                <Typography> You own {ownerDetails[auth.uid].percentOwned}% </Typography>
                <div style={{position: 'relative', width: 350, left: 46, top: 15}}>You are selling {market[auth.uid].percent}% at ${market[auth.uid].price} per percentage point.</div> 
                <Button style={{position: 'relative', top: 25}} variant='contained' color='primary' onClick={() => this.props.removeForSale(song, songId, callBack)}>Remove</Button>
              </div>
              :
              <div>

                <div className={classes.sellArea}>
                  <Typography variant='h5'> Sell Your Shares: </Typography>
                  <div style={{position:'relative', left: 125, top: 40}}>
                    <Slider step={1} style={{width: 200}} aria-labelledby="label" onChange={this.handleSlider} value={this.state.percentValue} max={ownerDetails[auth.uid].percentOwned} min={1}></Slider>
                    <div style={{position: 'relative', bottom: 10}}>{this.state.percentValue}%</div>
                  </div>
                  <TextField
                      style={{position: 'relative', left: 5, width: 100, top: 20}}
                      onChange={this.handlePriceChange}
                      helperText={this.state.priceInputError}
                      error={this.state.priceInputError.trim() !== ''}
                      name='priceInput'
                      label='Price ($)'
                      type='number'
                  />
                  <Button style={{position: 'relative', top: 40, left: 30}} variant='contained' color='primary' onClick={this.handlePutForSale}>Sell Song</Button>
                </div>
              </div> : ''}
              <Button className = {classes.button} onClick={() => this.props.viewDetails(song.id)}>
                  View Song Details
            </Button>
            </Paper>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  const {history} = state
    return {
        history: history,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      viewDetails: id => {
        ownProps.history.push(`/song/${id}`);
      },
      sellSong: (song, songId, percent, price, sellAllShares, callBack) => dispatch(dbPutSongForSale(song, songId, percent, price, sellAllShares, callBack)),
      removeForSale: (song, songId, callBack) => dispatch(dbRemoveSongForSale(song, songId, callBack))
    }
  }

  export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(SongDetails))
  );