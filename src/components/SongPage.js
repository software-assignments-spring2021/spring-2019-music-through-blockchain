import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import coverArt from "../img/albumArt.png";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import RoyaltyList from "./RoyaltyList";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  dbDeleteSong,
  dbPurchaseSong,
  dbPutSongForSale,
  dbRemoveSongForSale,
  dbGetSongOwners,
  dbGetSongById
} from "../store/actions/songActions";

let id = 0;
function createData(seller, pricePerRoyalty, amount, totalPrice) {
  id += 1;
  return { id, seller, pricePerRoyalty, amount, totalPrice };
}

const styles = theme => ({
  html: {
    height: "100%"
  },
  body: {
    height: "100%"
  },
  royalties: {
    width: "85%",
    margin: "auto",
    padding: 50
  },
  root: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "15px",
    display: "flex",
    marginTop: 60
  },
  artist: {
    fontSize: 12,
    color: "#358ED7",
    letterSpacing: "1px",
    textTransform: "uppercase",
    textDecoration: "none"
  },
  songName: {
    fontWeight: 300,
    fontSize: 52,
    color: "#43484D",
    letterSpacing: "-2px"
  },
  button: {
    background: "linear-gradient(to right, #647DEE, #7F53AC) !important",
    width: 300,
    color: "white !important",
    marginTop: 20,
    fontSize: 16
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    color: "#86939E",
    letterSpacing: "-1px",
    fontWeight: 300,
    lineHeight: "24px"
  },
  cover: {
    width: "70%",
    position: "relative",
    left: 0,
    top: 0
  },
  grid: {
    marginTop: 40
  }
});

export class SongPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSongPrice: false,
      priceUsd: 0,
      isLoaded: false
    };
  }

  scrollToBottom = () => {
    window.scrollTo(0, 1000);
  };

  convertEthtoUSD(){
    
  }
  componentDidMount() {
    const { drizzle, drizzleState, match } = this.props;
    const songId = match.params.songId;
    console.log("drizzle: ", drizzle);
    console.log("drizzleState", drizzleState);
    this.props.loadSong(songId);

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
          priceUsd: result[0].price_usd
        });
      },
      error => {
        console.log(error);
      }
    ).catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));

  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  buySong() {}

  render() {
    const {
      classes,
      auth,
      match,
      drizzleState,
      drizzle,
      isLoaded
    } = this.props;
    const songId = match.params.songId;
    const priceUsd = this.state.priceUsd;
    if (this.props.song && Object.keys(this.props.song["info"]).length > 0) {
      console.log("SongPage props: ", this.props);
      const song = this.props.song["info"][songId];
      console.log(this.props.song);
      const market = song['market']
      // const market = {
      //   "1": {
      //     price: 50,
      //     percent: 50
      //   },
      //   "2": {
      //     price: 50,
      //     percent: 50
      //   }
      // };
      console.log(Object.keys(market));
      if (auth.uid) {
        if (!drizzleState.drizzleStatus.initialized || isLoaded) {
          return <p>Loading ...</p>;
        }

        return (
          <div className={classes.root}>
            <Grid container spacing={24} className={classes.grid}>
              <Grid item xs={6}>
                <div className={classes.leftColumn}>
                  <img
                    className={classes.cover}
                    data-image="black"
                    src={song ? song["imageUrl"] : null}
                    alt=""
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <div>
                    <Typography className={classes.artist} variant="subtitle2">
                      {song ? song.artistName : ""}
                    </Typography>
                    <Typography className={classes.songName} variant="h4">
                      {song ? song.title : ""}
                    </Typography>
                    <p className={classes.description}>Add Short Description</p>
                  </div>
                </div>
                <div>
                  <p>All songs are only 0.008 ETH (${(0.008 * priceUsd).toFixed(2)})</p>
                  <Button
                    className={classes.button}
                    onClick={this.scrollToBottom}
                  >
                    Purchase Song
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.royalties}>
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ marginTop: 5 }}
                  >
                    Interested in investing in this song's royalties?
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    align="center"
                    style={{ marginTop: 25, marginBottom: 25 }}
                  >
                    Buy royalty packages from current song owners
                  </Typography>
                  {market && Object.keys(market).length > 0 ? (
                    <RoyaltyList
                      royalties={market}
                      song={song}
                      songId={songId}
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                      priceUSD = {priceUsd}
                    />
                  ) : (
                    "No Current Offers"
                  )}
                </div>
              </Grid>
            </Grid>
          </div>
        );
      } else {
        return <Redirect to="/" />;
      }
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteSong: songId => dispatch(dbDeleteSong(songId)),
    purchaseSong: (song, songId, sellerId) =>
      dispatch(dbPurchaseSong(song, songId, sellerId)),
    sellSong: (song, songId, percent, price, sellAllShares, callBack) =>
      dispatch(
        dbPutSongForSale(song, songId, percent, price, sellAllShares, callBack)
      ),
    removeForSale: (song, songId, callBack) =>
      dispatch(dbRemoveSongForSale(song, songId, callBack)),
    getSongOwners: (song, songId) => dispatch(dbGetSongOwners(song, songId)),
    loadSong: songId => dispatch(dbGetSongById(songId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SongPage));
