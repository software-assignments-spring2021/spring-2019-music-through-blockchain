import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { dbDeleteSong, dbPurchaseSong, dbPutSongForSale, dbRemoveSongForSale } from '../store/actions/songActions'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Modal from '@material-ui/core/Modal'
import DialogContent from '@material-ui/core/DialogContent';

import SongDetails from './SongDetails'

//USAGE:
// <SongList songs={songs} userId={1}/>

const styles = theme => ({
  paper: {
    width: "100%",
    marginTop: "20px",
    justify: "center",
    overflowX: "auto",
  },
  table: {
    cellPadding: "0",
    cellSpacing: "0",
    border: "0",
    borderWidth: 0,
    borderColor: "red",
    minWidth: 900,
    borderStyle: "solid"
  },
  head: {
    textAlign: "center",
    borderBottom: "solid 1px rgba(120,0,96,1)",
    fontWeight: 1000,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "black !important",
    textTransform: "uppercase"
  },
  icon : {
    height: 60,
    width: 50,
    marginLeft: 20,
    marginRight: 30,
    paddingRight:60,
    "&:hover": {
      color: "white !important"
    }

  },
  row: {
    "&:hover": {
      backgroundImage: "linear-gradient(to right, #647DEE, #7F53AC) !important",
      color: "white !important",
    },
  },
  tablecell: {
    paddingLeft: 20,
    textAlign: "center",
    verticalAlign: "middle",
    fontWeight: 300,
    fontSize: 12,
    color: "black",
    borderBottom: "solid 1px rgba(120,0,96,0.2)"
  },
  button: {
    background: "white",
    "&:hover": {
      border: "solid 3px white",
      color: "white !important"
    },
    border: "solid 1px rgba(120,0,96,0.2)",
    height: 48,
    width: "100%",
    marginLeft: 20
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover"
  }
});
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    paddingRight: "100px",
    fontSize: 14
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

export class SongRow extends Component {
  constructor(props) {
    super(props);
    this.state = { shadow: 1, detailsOpen: false}
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }
  
  handleOpenModal = (event) => {
    console.log('hello')
    event.stopPropagation()
    this.setState({ detailsOpen: true })
}
handleCloseModal = () => {
    this.setState({ detailsOpen: false })
} 
  componentWillMount() {
    const {songs} = this.props;
  }

  render() {
    const { classes, song, songsOwned, deleteSong, auth, drizzle, drizzleState} = this.props;
    if (song) {
      console.log('song on state', song)
      return (    
        <TableRow
        key={song.id}
        className={classes.row}
        onClick={console.log('hello')}
      >
        <TableCell>
          <div
            style={{
              width: 75,
              height: 75,
              backgroundColor: "lightgrey"
            }}
          >
            <img className={classes.image} src={song.imageUrl} />
          </div>
          <Typography className={classes.tablecell}>
            {song.title}
          </Typography>
        </TableCell>
        <TableCell align="right" className={classes.tablecell}>
          {song.artistName || "anonymous"}
        </TableCell>
        <TableCell align="right" className={classes.tablecell}>

          {(song.market[auth.uid] && songsOwned[song.id] ? songsOwned[song.id].percentOwned : songsOwned[song.id].percentOwned) || 100}%

        </TableCell>
         <TableCell align="right" className={classes.tablecell}>
           {(song.market[auth.uid] && songsOwned[song.id] ? song.market[auth.uid].percent : songsOwned[song.id].percent) || 0}%
         </TableCell>
        <TableCell align="right" className={classes.cell}>
        <Grid container direction='row' justify='space-evenly' alignItems='center'> 
        <Grid item xs ={8} >
        <Button
            className={classes.button}
            onClick={this.handleOpenModal}
          >
            Sell
          </Button>
        </Grid>
        <Grid item xs={4}>
        {(auth && songsOwned[song.id].percentOwned === 100) ? 
    <DeleteForeverIcon className={classes.icon}  onClick={(e) => {
      e.stopPropagation() 
      deleteSong(song.id, song.ownerId)
    }}/>
    : 
    ''
    }
            </Grid>
        </Grid>
        

        </TableCell>
        <Modal className={classes.modal} open={this.state.detailsOpen} onClose={this.handleCloseModal}>
          <DialogContent>
              <SongDetails song={song} totalPercent = {songsOwned[song.id].percentOwned} closeModal={this.handleCloseModal} songId={song.id} drizzle={drizzle} drizzleState={drizzleState} />
          </DialogContent>
        </Modal>
      </TableRow>
      
      
      );
    } else {
      return <div> </div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    viewDetails: (e, id) => {
      e.stopPropagation()
      ownProps.history.push(`/song/${id}`);
    },
    deleteSong: (songId, ownerId) => {
      dispatch(dbDeleteSong(songId, ownerId[0]))
    }

  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(SongRow))
);
