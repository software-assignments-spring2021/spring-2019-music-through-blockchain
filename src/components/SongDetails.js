import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = (theme) => ({
  paper: {
    
  }, 
  image: {

  }, 
  // img: {

  // }
})
export class SongDetails extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    const {classes } = this.props
    return (
        <Paper className={classes.paper}>
          <Grid container spacing={16}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="cover"
                  src="/static/complex.jpg"
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container spacing={16}>
                <Grid item xs>
                  <Typography>Artist</Typography>
                  <Typography>Title</Typography>
                  <Typography>20% Remaining</Typography>
                </Grid>
                <Grid item>
                  <Typography>$19.00</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatchProps, ownProps )=> {
  return {

  }
}

export default withStyles(styles)(SongDetails)
