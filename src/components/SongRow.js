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
    overflowX: "auto"
  },
  table: {
    cellPadding: "0",
    cellSpacing: "0",
    border: "0",
    borderWidth: 0,
    borderColor: "red",
    minWidth: 700,
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
  row: {
    "&:hover": {
      backgroundImage: "linear-gradient(to right, #647DEE, #7F53AC) !important",
      color: "white !important"
    }
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
  
  handleOpenModal = () => {
    console.log('hello')
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
      console.log('SONGS', )
      return (    
        <TableRow
        key={'1'}
        className={classes.row}
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
          <Typography className={classes.tablecell} 
                              onClick={() => this.props.viewDetails(song.id)}
          >
            {song.name}
          </Typography>
        </TableCell>
        <TableCell align="right" className={classes.tablecell}>
          {song.artistName || "anonymous"}
        </TableCell>
        <TableCell align="right" className={classes.tablecell}>
          {(song.market[auth.uid]? songsOwned[song.id].percentOwned - song.market[auth.uid].percent : songsOwned[song.id].percentOwned) || 0}%
        </TableCell>
        <TableCell align="right" className={classes.cell}>
          <Button
            className={classes.button}
            onClick={this.handleOpenModal}
          >
            Sell
          </Button>

    {(auth && songsOwned[song.id].percentOwned === 100) ? 
    <Button className={classes.deleteButton} onClick={() => deleteSong(song.id, song.ownerId)}>Delete</Button> 
    : 
    ''
    }

        </TableCell>
        <Modal className={classes.modal} open={this.state.detailsOpen} onClose={this.handleCloseModal}>
          <DialogContent>
              <SongDetails song={song} closeModal={this.handleCloseModal} songId={song.id} drizzle={drizzle} drizzleState={drizzleState} />
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
    viewDetails: id => {
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
