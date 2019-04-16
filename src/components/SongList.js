import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';



//USAGE:
// <SongList songs={songs} userId={1}/>

const styles = theme => ({
  paper: {
    width:'100%', 
    marginTop: '20px',
    justify: 'center', 
    overflowX: 'auto'
  },
  table: {
    minWidth: 700,    
    width: '100%',
  },
  image: {
    height:'100%', 
    width: '100%', 
    objectFit: 'cover'
  }, 
  tablecell: {
    fontSize: '12pt', 
    marginTop: 25
  }

});
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    paddingRight: '100px', 
    fontSize: 14
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

export class SongList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes, songs, songsOwned  } = this.props
    if (songs && (songs.length) > 0 && songsOwned) {
      console.log(songs)
        return (
          <Grid container justify="center"> 
          <Paper className={classes.paper}>
                <Table className={classes.table}> 
                  <colgroup>
                    <col style={{width:'5%'}}/>
                    <col style={{width:'19%'}}/>
                    <col style={{width:'19%'}}/>
                    <col style={{width:'19%'}}/>
                    <col style={{width:'19%'}}/>
                   </colgroup>
              <TableHead>
              <TableRow > 
                <CustomTableCell align="center" >Song</CustomTableCell>
                <CustomTableCell align="right">Artist</CustomTableCell>
                <CustomTableCell align="right">Price</CustomTableCell>
                <CustomTableCell align="right">% Royalty</CustomTableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                  { songs && songsOwned.map(id => (
                   
                  <TableRow key={id} className={classes.tablecell} onClick = {() => this.props.viewDetails(id)}>
                  <TableCell>
                    <Grid container wrap="nowrap" spacing={16}>
                        <Grid item>
                          <div style={{width: 75, height:75, backgroundColor: 'lightgrey'}}>
                            <img className={classes.image} src ={songs[id].imageUrl} />
                          </div>
                        </Grid>
                      <Grid item xs zeroMinWidth alignContent="center">
                        <Typography className={classes.tablecell}>{songs[id].title}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                    <TableCell align="right" className={classes.tablecell} >{songs[id].artistName || 'anonymous'}</TableCell>
                    <TableCell align="right" className={classes.tablecell} style={{paddingRight: '120px'}}> {songs[id].price || 0 }$ </TableCell>
                    <TableCell align="right" className={classes.tablecell}>{songs[id].percentOwned || 0 }% </TableCell>
                  </TableRow>          
                  ))}
            </TableBody>
            </Table>
          </Paper>
          </Grid>
          )
    } else {
      return ( 
        <div> </div>
      )}
    }}

    const mapStateToProps = (state) => {
      return {
          auth: state.firebase.auth,
          profile: state.firebase.profile
      }
    }
    const mapDispatchToProps = (dispatch, ownProps) => {
      return {
        viewDetails: (id) => {
          console.log('hello')
          ownProps.history.push(`/song/${id}`);
        }
      }
    }    
    


    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SongList)))
