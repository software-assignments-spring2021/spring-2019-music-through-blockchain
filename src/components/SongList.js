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

export class SongList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, songs, songsOwned } = this.props;
    if (songs && songs.length > 0 && songsOwned) {
      console.log(songs);
      return (
        <Grid container justify="center">
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <colgroup>
                <col style={{ width: "5%" }} />
                <col style={{ width: "19%" }} />
                <col style={{ width: "19%" }} />
                <col style={{ width: "19%" }} />
                <col style={{ width: "19%" }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.head} align="left">
                    Song
                  </TableCell>
                  <TableCell className={classes.head} align="left">
                    Artist
                  </TableCell>
                  <TableCell className={classes.head} align="left">
                    % Royalty
                  </TableCell>
                  <TableCell className={classes.head} align="left" />
                </TableRow>
              </TableHead>
              <TableBody>
                {songs.map(song => (
                  <TableRow
                    key={song.id}
                    className={classes.row}
                    onClick={() => this.props.viewDetails(song.id)}
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
                        {song.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" className={classes.tablecell}>
                      {song.artistName || "anonymous"}
                    </TableCell>
                    <TableCell align="right" className={classes.tablecell}>
                      {songsOwned[song.id].percentOwned || 0}%{" "}
                    </TableCell>
                    <TableCell align="right" className={classes.cell}>
                      <Button
                        className={classes.button}
                        onClick={() => console.log("hello")}
                      >
                        Sell
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      );
    } else {
      return <div> </div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    viewDetails: id => {
      console.log("hello");
      ownProps.history.push(`/song/${id}`);
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(SongList))
);
