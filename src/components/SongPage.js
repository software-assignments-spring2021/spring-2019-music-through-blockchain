import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import coverArt from "../img/albumArt.png";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import RoyaltyList from "./RoyaltyList";
let id = 0;
function createData(seller, pricePerRoyalty, amount, totalPrice) {
  id += 1;
  return { id, seller, pricePerRoyalty, amount, totalPrice };
}

const royalties = [
  createData("Seller 1", 20, 5, 100),
  createData("Seller 2", 20, 5, 100),
  createData("Seller 3", 20, 5, 100),
  createData("Seller 4", 20, 5, 100),
  createData("Seller 5", 20, 5, 100)
];

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
    color: 'white !important',
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
  }
  scrollToBottom = () => {
    window.scrollTo(0, 1000);
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    const { classes, auth, match } = this.props;
    console.log("profile props: ", this.props);
    return (
      <div className={classes.root}>
        <Grid container spacing={24} className={classes.grid}>
          <Grid item xs={6}>
            <div className={classes.leftColumn}>
              <img
                className={classes.cover}
                data-image="black"
                src={coverArt}
                alt=""
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <div>
                <Typography className={classes.artist} variant="subtitle2">
                  Ariana Grande
                </Typography>
                <Typography className={classes.songName} variant="h4">
                  Thank u, next
                </Typography>
                <p className={classes.description}>
                  Lorem ipsum dolor sit amet et delectus accommodare his consul
                  copiosae legendos at vix ad putent delectus delicata usu.
                  Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos
                  erant dolorum an. Per facer affert ut. Mei iisque mentitum
                  moderatius cu. 
                </p>
              </div>
            </div>
            <div>
              <Button className ={classes.button} onClick={this.scrollToBottom}>Purchase Song</Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.royalties}>
              <Typography variant="h4" align="center" style={{ marginTop: 5 }}>
                Interested in investing in this song's royalties?
              </Typography>
              <Typography
                variant="subtitle2"
                align="center"
                style={{ marginTop: 25, marginBottom: 25 }}
              >
                Buy royalty packages from current song owners
              </Typography>
              <RoyaltyList royalties={royalties} />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SongPage);
