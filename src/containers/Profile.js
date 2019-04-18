import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import DialogContent from '@material-ui/core/DialogContent';
import { Redirect } from 'react-router-dom';
import { getUserInfo } from '../store/actions/userActions'
import SongUpload from './SongUpload'
import EditProfile from '../components/EditProfile'
import SongList from '../components/SongList'
import { connect } from 'react-redux'
import {songs} from './mock.js'

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
      backgroundColor: 'lightgrey',
      left: '10%',
      width: '80%',
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
  },

  topRight: {
    position: 'absolute',
    backgroundColor: 'lightgrey',
    top: '2%',
    right: 0,
    height: '96%',
    width: '33%',
  },

  modal: {
    position: 'absolute',
    width: 470,
    margin: 'auto',
    padding: '8% 0',
  },

  artistName: {
    position: 'absolute',
    top: 15, 
    left: 5
  },
  description: {
    position: 'absolute',
    top: 50, 
    left: 5
    
  }
})

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        uploadModalOpen: false,
        editProfileOpen: false
    }
  }
  componentDidMount = () => {
    const {loadProfile, match} = this.props;

    if (match.params.uid) {
      loadProfile((match.params.uid));
    } 
    else {
      console.log("nothing to load")
    }
  }
  handleOpenUpload = () => {
    this.setState({ uploadModalOpen: true })
  }
  handleCloseUpload = () => {
    this.setState({ uploadModalOpen: false })
  } 
  handleOpenEditProfile = () => {
    this.setState({ editProfileOpen: true })
  }
  handleCloseEditProfile = () => {
    this.setState({ editProfileOpen: false })
  } 

  render() {
    const {classes, auth, match,user} = this.props
    const songs = user.user.songs;
    if(!auth.uid){
      return <Redirect to='/' />
    }
    return (
      <div className={classes.root}>
        <div className={classes.rowOne}>
          <div className={classes.topLeft}>
            <div className={classes.avatar}><img className={classes.avatarPhoto} src={user.user.photoUrl} alt='no photo'></img></div>
          </div>
          <div className={classes.topCenter}>
          <Typography className={classes.artistName} variant="h4">
              {user.user.artistName}
          </Typography>
            {/* <h3 className={classes.artistName}>{user.user.artistName}</h3> */}
            {/* <Typography> </Typography> */}
            <p className={classes.description} align='left'>{user.user.bio}</p>
            {(match.params.uid === auth.uid) ? 
              <div style={{display: 'inline', position: 'absolute', bottom: 5, left: 5}}>
                <Button style={{backgroundColor: 'lightgrey', marginRight: 10}} onClick={this.handleOpenEditProfile}>Edit Profile</Button> 
                <Button style={{backgroundColor: 'lightgrey'}} onClick={this.handleOpenUpload}>Upload Song</Button> 
              </div> : ''}
          </div>

        </div>
        <div className={classes.rowTwo}>
          <div className={classes.songList}> 
              {/* <SongList songs= {songs} songsOwned={user.user.songsOwned} /> */}
          </div>
        </div> 
        <Modal className={classes.modal} open={this.state.uploadModalOpen} onClose={this.handleCloseUpload}>
            <DialogContent>
                <SongUpload />
            </DialogContent>
        </Modal>
        <Modal className={classes.modal} open={this.state.editProfileOpen} onClose={this.handleCloseEditProfile}>
            <DialogContent>
                <EditProfile />
            </DialogContent>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      ...state,
      auth: state.firebase.auth,
      profile: state.firebase.profile,
      user: state.user
  }
}
const mapDispatchToProps = (dispatch , ownProps) => {
  console.log("ownProps", ownProps)
  return {
    loadProfile: (uid) => dispatch(getUserInfo(uid))
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Profile))
