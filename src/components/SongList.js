import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux'

const styles = theme => ({
  paper: {
    width:'80%', 
    margin: '20px', 
    justify: 'center'
  },
  root: {
    width: '100%',
    height: '100vh'
  },
  gridList: {
    width: '100%',
    height: '100vh',
    padding: '5vh 5vw',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    position: 'relative'
  }, 
  tile: {
    margin: '5px',
    cursor: 'pointer',
    overflow: 'hidden',
    width: '18vw',
    height: '18vw',
    img: {
        width: '100%'
    }
  }, 
  table: {
    width: '100%',
  }

});
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export class SongList extends Component {
  render() {
    const {classes, songs, artistPage  } = this.props
    if (songs) {
      if (artistPage) {
        return (
          <Grid container justify="center"> 
          <Paper className={classes.paper}>
                  <Table className={classes.table}> 
              <TableHead>
                <TableRow>
                  <CustomTableCell numeric>Song</CustomTableCell>
                  <CustomTableCell numeric>Artist</CustomTableCell>
                  <CustomTableCell numeric>Price</CustomTableCell>
                  <CustomTableCell numeric>% Royalty</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  { songs && songs.map(song => (
                  <TableRow key={song.id}>
                    <CustomTableCell numeric>{song.title}</CustomTableCell>
                    <CustomTableCell numeric>{song.artist}</CustomTableCell>
                    <CustomTableCell numeric>{song.price}</CustomTableCell>
                    <CustomTableCell numeric>{song.remainingShare}</CustomTableCell>
                  </TableRow>          
                  ))}
            </TableBody>
            </Table>
          </Paper>
          </Grid>
          )
        } else {
        return (
          <div className={classes.root}>
          <Typography>Trending</Typography>

          <GridList cellHeight={'100%'} className={classes.gridList} cols={5} >
            {songs.map(({ title, cover }) => (
              <GridListTile key={title} className = {classes.tile} >
                <img src={cover} alt={title}/>
              </GridListTile>
            ))}
          </GridList>
          </div>
        )
      }
    } else {
      return ( 
        <div> </div>
      )}
  
    }}

const mapStateToProps = (state) => {
  return {
    songs: state.firestore.ordered.songs
  }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
      collection: 'songs'
     // ordrerBy
    }]), 
    withStyles(styles)
  )(SongList)