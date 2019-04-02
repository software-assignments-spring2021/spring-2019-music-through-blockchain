import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import DialogContent from '@material-ui/core/DialogContent';

import SongUpload from './SongUpload'

const styles = theme => ({
  root: {   
      display: 'flex',
      position: 'relative',
      bottom: 42,
      width: 1100,
      margin: 'auto',
      justifyContent:'center',
      alignItems: 'center', 
      
  },

  rowOne: {
      position: 'absolute',
      top: 65,
      width: '100%',
      maxWidth: 960,
      height: 240,
      boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.75)'
  },

  rowTwo : {
      position: 'absolute',
      top: 310,
      height: 500,
      width: '100%',
      maxWidth: 960,
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
    position: 'absolute',
    bottom: 27,
    left: 27,
    height: 180,
    width: 180,
    borderRadius: '50%',
    overflow: 'hidden',
    elevation: 2,
    boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.75)'
  },

  avatarPhoto: {
    height: '100%',
    width: 'auto'
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
    backgroundColor: 'lightgrey',
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

  modal: {
    position: 'absolute',
    width: 470,
    margin: 'auto',
    padding: '8% 0',
  }
})

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        modalOpen: false 
    }
  }

  handleOpenModal = () => {
    this.setState({ modalOpen: true })
  }
  handleCloseModal = () => {
    this.setState({ modalOpen: false })
  } 

  render() {
    const {classes} = this.props
    console.log('Modal state: ', this.state.modalOpen)
    return (
      <div className={classes.root}>
        <div className={classes.rowOne}>
          <div className={classes.topLeft}>
            <div className={classes.avatar}><img className={classes.avatarPhoto} src='https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png' alt='no photo'></img></div>
          </div>
          <Typography className={classes.topCenter}>

          </Typography>
          <Card className={classes.topRight}>
            <Button className={classes.uploadButton} onClick={this.handleOpenModal}>upload</Button>
          </Card>
        </div>
        <div className={classes.rowTwo}>
          <div className={classes.songList}> 

          </div>
        </div> 
        <Modal className={classes.modal} open={this.state.modalOpen} onClose={this.handleCloseModal}>
            <DialogContent>
                <SongUpload />
            </DialogContent>
        </Modal>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Profile)
