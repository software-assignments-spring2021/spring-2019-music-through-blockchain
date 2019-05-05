import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import SvgShare from "@material-ui/icons/Share";
import SvgComment from "@material-ui/icons/Comment";
import SvgFavorite from "@material-ui/icons/Favorite";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import SvgFavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { grey } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/lab/Slider";
import Menu from "@material-ui/core/Menu";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Zoom from "@material-ui/core/Zoom";
import styled from "@emotion/styled/macro";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import {
  dbDeleteSong,
  dbPurchaseSong,
  dbPutSongForSale,
  dbRemoveSongForSale
} from "../store/actions/songActions";

const styles = theme => ({
  textField: {
    minWidth: 280,
    marginTop: 20
  },
  contain: {
    margin: "0 auto"
  },
  titleFrame: {
    position: "relative",
    top: 10,
    left: 10,
    width: 255
  },
  coverArtFrame: {
    position: "relative",
    left: 95,
    bottom: 90,
    maxHeight: 70,
    width: 70,
    backgroundColor: "grey"
  },
  myStats: {
    position: "relative",
    bottom: 70,
    right: 80
  },
  title: {},
  artist: {},
  offerList: {
    position: "relative",
    bottom: 50,
    right: 50
  },
  paper: {
    height: 420,
    width: 450,
    textAlign: "center",
    display: "block",
    margin: "auto"
  },
  deleteButton: {
    backgroundColor: "lightgrey",
    "&:hover": {
      backgroundColor: "grey !important"
    },
    position: "relative",
    left: 90,
    bottom: 27
  },
  button: {
    position: "relative",
    top: 100,
    background: "linear-gradient(to right, #647DEE, #7F53AC) !important",
    color: "white"
  }, 
  buyButton: {
    background: "linear-gradient(to right, #647DEE, #7F53AC) !important",
    color: "white"

  }
});

class SongDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      percentValue: 1,
      price: null,
      priceInputError: "",
      priceUSD: 0
    };
  }

  componentDidMount(){
    //convert Eth to USD
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.coinmarketcap.com/v1/ticker/ethereum"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url)
    .then(res => {
      return res.clone().json();
    })
    .then(
      result => {
        console.log("The result is:", result);
        this.setState({
          isLoaded: true,
          priceUSD: result[0].price_usd
        });
      },
      error => {
        console.log(error);
      }
    ).catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
  }
  
  handleBuyRoyalties(royalties, sellerId){

    const {song,songId} = this.props;

    console.log("ROYALTIES", royalties);
    console.log("song", song);
    console.log("sellerId", sellerId);
    //get the rest of the song info from props


    const songAddress = song.songPublicAddress;
    const sellerAddress = royalties[sellerId].sellerAddress;
    const totalPrice = royalties[sellerId].price;

    console.log('Buying ', royalties[sellerId].percent, '% for $', totalPrice);
    console.log(songAddress, " is the song and ", sellerAddress, " is the seller");

    
    this.buyRoyalties(songAddress, sellerAddress, totalPrice).then((txHash)=>{
      this.props.purchaseSong(song, songId, sellerId);
      //display txHash as receipt of the transaction
    }).catch(error=>{
      console.log(error);
    });
  }

  buyRoyalties(songAddress, sellerAddress, totalPrice){
    return new Promise((resolve, reject) => {
      const { drizzle, drizzleState } = this.props;
      const contract = drizzle.contracts.SongsContract;
      if(drizzleState.drizzleStatus.initialized){
        contract.methods.buyRoyalties(songAddress, sellerAddress).send({ value: totalPrice * 1000000000000000000, from: drizzleState.accounts[0], gas: 4712388,}, 
            function(error, result){
                if(error){
                    console.log(error);
                    return undefined;
                } else{
                    console.log("TX hash is " + result);
                    //display txHash as a transaction receipt
                    return songAddress;
                }
            }                
        );
      }
    });  
  }

  render() {
    const { songId, song, classes, theme, auth } = this.props;
    const title = song["title"];
    const artist = song["artistName"];
    const coverArt = song["imageUrl"];
    const media = song["songUrl"];
    const ownerDetails = song["ownerDetails"];
    const market = song["market"];
    const cardSize = 130;
    const titleSize = 14;
    const subtitleSize = 12;
    const iconSize = 30;
    const callBack = () => {
      this.props.closeModal();
    };

    console.log("song Details props: ", this.props);
    console.log("song ownerDetails", song["ownerDetails"]);
    console.log("Market", market);

    return (
      <Grid container spacing={24} style={{ overflow: "hidden" }}>
        <Grid item xs={12} className={classes.contain}>
          <div>
            <Paper className={classes.paper} elevation={1}>
              <div className={classes.titleFrame}>
                <h2 className={classes.title}>{title}</h2>
                <h4 className={classes.artist}>{artist}</h4>
              </div>
              <br />
              <img className={classes.coverArtFrame} src={coverArt} />
              <Grid className={classes.offerList}>
                <Grid item>
                  <Typography variant="h6"> Current Offers: </Typography>
                  {market && Object.keys(market).length > 0 ? (
                    Object.keys(market).map(key => {
                      const price = market[key]["price"];
                      const percent = market[key]["percent"];
                      return (
                        <div
                          key={key}
                          style={{ position: "relative", left: 0 }}
                        >
                          <div>
                            Price: ${(price * this.state.priceUSD).toFixed(2).toLocaleString()} for {percent}%
                          </div>
                          <Button
                          className ={classes.buyButton}
                            style={{
                              position: "relative",
                              top: 20,
                            }}
                            variant="contained"
                            onClick={() =>
                              this.props.purchaseSong(song, songId, key)
                            }
                          >
                            Buy Song
                          </Button>
                        </div>
                      );
                    })
                  ) : (
                    <Typography variant="subtitle">
                      {" "}
                      No offers at the moment:{" "}
                    </Typography>
                  )}
                </Grid>

                <div />
                <Button
                  className={classes.button}
                  onClick={() => this.props.viewDetails(song.id)}
                >
                  View Song Details
                </Button>
              </Grid>
            </Paper>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { history } = state;
  return {
    history: history,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    viewDetails: id => ownProps.history.push(`/song/${id}`),
    purchaseSong: (song, songId, sellerId) =>
      dispatch(dbPurchaseSong(song, songId, sellerId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(SongDetails))
);
