import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";
import { Redirect } from "react-router-dom";
import { getUserInfo } from "../store/actions/userActions";
import SongUpload from "./SongUpload";
import EditProfile from "../components/EditProfile";
import SongList from "../components/SongList";
import { connect } from "react-redux";
import { songs } from "./mock.js";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import CustomTableHead from "./TableHead";
import CustomTableToolbar from "./TableToolbar";
import Grid from "@material-ui/core/Grid";
import { TableBody } from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";

const styles = theme => ({
  paper: {
    minHeight: 370,
    maxWidth: 450,
    minWidth: 337,
    textAlign: "center",
    display: "block",
    margin: "auto"
  },
  withdrawModalButton: {
    background: "linear-gradient(to right, #647DEE, #7F53AC) !important",
    "&:hover": {
      border: "solid 3px white",
      color: "white !important"
    },
    border: "solid 1px rgba(120,0,96,0.2)",
    width: "50%",
    marginLeft: 20,
    marginBottom: 20,

    color: "white !important",
    fontSize: 14
  },
 
  root: {   
      display: 'flex',
      position: 'relative',
      bottom: 42,
      width: 1100,
      top: 0.5,
      minHeight: 1000,
      margin: 'auto',
      justifyContent:'center',
      alignItems: 'center', 
      
  },

  rowOne: {
      position: 'absolute',
      backgroundColor: 'white',
      top: 65,
      width: '100%',
      maxWidth: 960,
      height: 240,
      boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.75)'
  },

  rowTwo: {
    position: "absolute",
    top: 310,
    height: 100,
    width: "100%",
    maxWidth: 960,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  rowThree: {
    position: "absolute",
    top: 380,
    height: 500,
    width: "100%",
    maxWidth: 960
  },

  songList: {
    position: "absolute",
    top: 30,
    bottom: 30,
    width: "90%",
    left: '5%'
  },

  topLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "24%",
    height: "100%"
  },

  avatar: {
    position: "absolute",
    bottom: 27,
    left: 27,
    height: 180,
    width: 180,
    borderRadius: "50%",
    overflow: "hidden",
    elevation: 2,
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.75)"
  },

  avatarPhoto: {
    height: "100%",
    width: "auto"
  },

  topCenter: {
    position: "absolute",
    top: "10%",
    left: "25%",
    height: "80%",
    width: "40%"
  },

  topRight: {
    position: "absolute",
    backgroundColor: "lightgrey",
    top: "2%",
    right: 0,
    height: "96%",
    width: "33%"
  },

  modal: {
    position: "absolute",
    width: 470,
    margin: "auto",
    padding: "8% 0"
  },

  artistName: {
    position: "absolute",
    top: 15,
    left: 5,
    fontWeight: 300,
    fontSize: 52,
    color: "#43484D",
    letterSpacing: "-2px"
  },
  description: {
    position: "absolute",
    top: 50,
    left: 5
  },
  button: {
    background: "linear-gradient(to right, #647DEE, #7F53AC) !important",
    "&:hover": {
      border: "solid 3px white",
      color: "white !important"
    },
    border: "solid 1px rgba(120,0,96,0.2)",
    height: 48,
    width: 300,
    marginLeft: 20,
    color: "white !important",
    fontSize: 16
  }
});

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadModalOpen: false,
      editProfileOpen: false,
      isWithdrawing: false,
      selected: [],
      publicAddresses: [],
      rowsPerPage: 5,
      page: 1
    };
  }

  componentDidMount = () => {
    const { loadProfile, match } = this.props;

    if (match.params.uid) {
      loadProfile(match.params.uid);
    } else {
      console.log("nothing to load");
    }
  };
  handleOpenUpload = () => {
    this.setState({ uploadModalOpen: true });
  };
  handleCloseUpload = () => {
    this.setState({ uploadModalOpen: false });
  };
  handleOpenEditProfile = () => {
    this.setState({ editProfileOpen: true });
  };
  handleCloseEditProfile = () => {
    this.setState({ editProfileOpen: false });
  };
  handleCloseWithdraw = () => {
    this.setState({ isWithdrawing: false });
  };

  handleClick = (event, id, publicAddress) => {
    const { selected, publicAddresses } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    let newPublicAddresses = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      newPublicAddresses = newPublicAddresses.concat(publicAddresses, publicAddress);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newPublicAddresses = newPublicAddresses.concat(publicAddresses.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newPublicAddresses = newPublicAddresses.concat(publicAddresses.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newPublicAddresses = newPublicAddresses.concat(
        publicAddresses.slice(0, selectedIndex),
        publicAddresses.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected, publicAddresses: newPublicAddresses });
  };
  handleOpenWithdraw() {
    console.log("OPEN MODAL");
    this.setState({ isWithdrawing: true });
  }
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleSelectAllClick = event => {
    if (event.target.checked) {
      console.log("check all");
      this.setState(state => ({
        selected: this.props.user.user.songs.map(n => n.id),
        publicAddresses: this.props.user.user.songs.map(n => n.songPublicAddress)
      }));
      return;
    }
    this.setState({ selected: [], publicAddresses: [] });
  };
  generateRows = songs => {
    console.log("SONGS", songs);
    const owned = this.props.user.user.songsOwned;
    const { classes } = this.props;
    const auth = this.props.auth;
    let rows = songs.map(s => {
      const isSelected = this.isSelected(s.id);
      return (
        <TableRow
          hover
          onClick={event => this.handleClick(event, s.id, s.songPublicAddress)}
          role="checkbox"
          aria-checked={isSelected}
          tabIndex={-1}
          key={s.id}
          selected={isSelected}
        >
          <TableCell padding="checkbox">
            <Checkbox style={{ color: "#7F53AC" }} checked={isSelected} />
          </TableCell>
          <TableCell component="th" scope="row" padding="none">
            {s.title}
          </TableCell>
          <TableCell align="right">
            {s.market[auth.uid] && owned[s.id]
              ? owned[s.id].percentOwned
              : owned[s.id].percentOwned}{" "}
            %
          </TableCell>
        </TableRow>
      );
    });

    return rows;
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleWithdrawFunds(){

    const songs = this.state.publicAddresses;
    console.log("public addresses", this.state.publicAddresses);
    console.log("songs ids selected", this.state.selected);

    songs.forEach((songAddress)=>{
      this.withdrawFunds(songAddress).then((result)=>{
        console.log("You have successfully retrieved funds from ", songAddress);
        console.log("Your TX Hash is ", result);
      }).catch((error)=>{
        console.log(error);
      })

/*
      this.checkSongBalance(songAddress).then((songBalance)=>{
        console.log("Your balance for this song is: " + songBalance);
      }).catch((error)=>{
        console.log(error);
      });
*/
    });
  }

  withdrawFunds(songAddress){ 
    return new Promise((resolve, reject) => {
      const { drizzle, drizzleState } = this.props;
      const contract = drizzle.contracts.SongsContract;

      if(drizzleState.drizzleStatus.initialized){
        
        contract.methods.withdraw(songAddress).send({from: drizzleState.accounts[0], gas: 22680 }, 
            function(error, result){
                if(error){
                  reject(error);
                } else{
                  console.log("The transaction was succesful");
                  resolve(result);
                }
            }                
        );
      }
    });
  }

  checkSongBalance(songAddress){
    return new Promise((resolve, reject) => {
      const { drizzle, drizzleState } = this.props;
      const contract = drizzle.contracts.SongsContract;
      console.log("drizzle obj", drizzle);
      console.log("drizzleState obj", drizzleState);

      if(drizzleState.drizzleStatus.initialized){

        drizzle.web3.eth.estimateGas({
          to: "0x2E0185e55d80FCdC0C0d456b7e10e0dEE3B5CdcB" ,//drizzle.contracts.SongsContract.address,
          data: contract.methods.withdraw(songAddress).encodeABI()
        }).then((result)=>{
          console.log("the balance is: " + result);
          resolve(result);
        }).catch(error=>{
          reject(error);
        })
        /*
        contract.methods.checkSongBalance(songAddress).call({from: drizzleState.accounts[0], gas: 4712388}).then((result)=>{
          console.log(result);
          resolve(result);
        }).catch(error=>{
          reject(error);
        })*/
      }
    });
  }

  render() {
    const {
      classes,
      auth,
      match,
      user,
      profile,
      drizzle,
      drizzleState
    } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    //const emptyRows =rowsPerPage - Math.min(rowsPerPage, songs.length - page * rowsPerPage);

    const songs = user.user.songs;
    if (songs) {
      console.log(songs[0]);
    }
    if (!auth.uid) {
      return <Redirect to="/" />;
    }
    return (
      <div className={classes.root}>
        <div className={classes.rowOne}>
          <div className={classes.topLeft}>
            <div className={classes.avatar}>
              <img
                className={classes.avatarPhoto}
                src={user.user.photoUrl}
                alt="no photo"
              />
            </div>
          </div>
          <div className={classes.topCenter}>
            <Typography className={classes.artistName} variant="h4">
              {user.user.artistName}
            </Typography>
            {/* <h3 className={classes.artistName}>{user.user.artistName}</h3> */}
            {/* <Typography> </Typography> */}
            <p className={classes.description} align="left">
              {user.user.bio}
            </p>
            {match.params.uid === auth.uid ? (
              <div
                style={{
                  display: "inline",
                  position: "absolute",
                  bottom: 5,
                  left: 5
                }}
              >
                <Button
                  style={{ backgroundColor: "lightgrey", marginRight: 10 }}
                  onClick={this.handleOpenEditProfile}
                >
                  Edit Profile
                </Button>
                <Button
                  style={{ backgroundColor: "lightgrey" }}
                  onClick={this.handleOpenUpload}
                >
                  Upload Song
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={classes.rowTwo}>
          <Button
            className={classes.button}
            onClick={() => {
              this.handleOpenWithdraw();
            }}
          >
            Withdraw Earnings
          </Button>
        </div>
        <div className={classes.rowThree}>
          <div className={classes.songList}>
            <SongList
              songs={songs}
              songsOwned={user.user.songsOwned}
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
          </div>
        </div>
        <Modal
          className={classes.modal}
          open={this.state.uploadModalOpen}
          onClose={this.handleCloseUpload}
        >
          <DialogContent>
            <SongUpload drizzle={drizzle} drizzleState={drizzleState} />
          </DialogContent>
        </Modal>
        <Modal
          className={classes.modal}
          open={this.state.editProfileOpen}
          onClose={this.handleCloseEditProfile}
        >
          <DialogContent>
            <EditProfile
              accountOwner={profile.accountOwner}
              artistName={profile.artistName}
              biography={profile.biography}
            />
          </DialogContent>
        </Modal>
        <Modal
          className={classes.modal}
          open={this.state.isWithdrawing}
          onClose={this.handleCloseWithdraw}
        >
          <DialogContent>
            <Grid container={true} alignContent="center">
              <Paper className={classes.paper} elevation={1}>
                <div style={{ padding: "48px 40px 36px" }}>
                  <div style={{ paddingLeft: "40px", paddingRight: "40px" }}>
                    <h2>Withdraw Earnings</h2>
                  </div>
                  <Typography variant="body1">
                    Select songs to withdraw earnings from
                  </Typography>
                  {songs.length > 0 ? (
                    <Table
                      className={classes.table}
                      aria-labelledby="tableTitle"
                    >
                      <CustomTableToolbar numSelected={selected.length} />
                      <div className={classes.tableWrapper}>
                        <CustomTableHead
                          numSelected={selected.length}
                          onSelectAllClick={this.handleSelectAllClick}
                          rowCount={songs.length}
                        />
                        <TableBody>{this.generateRows(songs)}</TableBody>
                      </div>
                    </Table>
                  ) : (
                    <Typography variant="subtitle" style={{marginTop:50}}>
                    Please upload songs first 
                  </Typography>
                  )}
                </div>
                <Button
                  onClick={()=>{this.handleWithdrawFunds(songs)}}
                  className={classes.withdrawModalButton}
                >
                  Withdraw
                </Button>
              </Paper>
            </Grid>
          </DialogContent>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    user: state.user
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  console.log("ownProps", ownProps);
  return {
    loadProfile: uid => dispatch(getUserInfo(uid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Profile));
