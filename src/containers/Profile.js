import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
      display: 'flex',
      justifyContent:'center',
      alignItems: 'center', 
  },

  navBar: {
    position: 'fixed',
    height: 80,
    top: '0%',
    left: '1%',
    width: '98%',
    border: '3px solid red',
  },

  rowOne: {
      position: 'absolute',
      top: 65,
      width: '98%',
      maxWidth: 960,
      height: 240,
      border: '3px solid blue',
  },

  rowTwo : {
      position: 'absolute',
      top: 310,
      height: 500,
      width: '98%',
      maxWidth: 960,
      border: '3px solid blue',
  },

  songList: {
      position: 'absolute',
      top: 30,
      bottom: 30,
      left: '10%',
      width: '80%',
      backgroundColor: 'lightgrey',
  },

  topLeft: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '24%',
      height: '100%',
  },

  avatar: {
    height: '95%',
    borderRadius: '50%',
    border: '3px solid green',
  },

  topCenter: {
    position: 'absolute',
    top: '10%',
    left: '25%',
    height: '80%',
    width: '40%',
    backgroundColor: 'lightgrey',
  },

  topRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '33%',
  },

  uploadButton: {
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
})

export class Profile extends Component {
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <div className={classes.rowOne}>
          <div className={classes.topLeft}>
            <div className={classes.avatar}></div>
          </div>
          <Typography className={classes.topCenter}>

          </Typography>
          <Card className={classes.topRight}>
            <Button className={classes.uploadButton}>upload</Button>
          </Card>
        </div>
        <div className={classes.rowTwo}>
          <div className={classes.songList}> 

          </div>
        </div> 
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Profile)
