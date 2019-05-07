import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux'
import { dbGetSellers } from '../store/actions/userActions'

import { dbPurchaseSong } from '../store/actions/songActions'

const styles = theme => ({
  table: {
    cellPadding: "0",
    cellSpacing: "0",
    border: "0",
    borderWidth: 0,
    borderColor: "red",
    minWidth: 700,
    borderStyle: "solid",
  },
  head: {
    textAlign: "center",
    borderBottom: "solid 1px rgba(120,0,96,1)",
    fontWeight: 1000,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "white !important",
    textTransform: "uppercase"
  },
  row: {
    "&:hover": {
      backgroundImage: "linear-gradient(to right, #647DEE, #7F53AC) !important",
      color: "white !important",
    },
    backgroundColor: 'white !important'

  },
  cell: {
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
    marginLeft: 20,
  }
});
export class RoyaltyList extends Component {
  state = {
    color: "default"
  };

  handleChange = event => {
    this.setState({ color: event.target.checked ? "blue" : "default" });
  };

  handleBuyRoyalties(royalties, sellerId){

    const {song,songId} = this.props;

    console.log("ROYALTIES", royalties);
    console.log("song", song);
    console.log("sellerId", sellerId);
    //get the rest of the song info from props


    const songAddress = song['info'][songId].songPublicAddress;
    const sellerAddress = royalties[sellerId].sellerAddress;
    const totalPrice = royalties[sellerId].price;

    console.log('Buying ', royalties[sellerId].percent, '% for $', totalPrice);
    console.log(songAddress, " is the song and ", sellerAddress, " is the seller");

    
    this.buyRoyalties(songAddress, sellerAddress, totalPrice).then((results)=>{
      //display txHash as receipt of the transaction
      console.log("The TX Hash is " + results.txHash);
      this.props.purchaseSong(song['info'][songId], songId, sellerId);
    }).catch(error=>{
      console.log("something went wrong in buy royalties");
      console.log(error);
    });
  }

  buyRoyalties(songAddress, sellerAddress, totalPrice){
    return new Promise((resolve, reject) => {
      const { drizzle, drizzleState } = this.props;
      const contract = drizzle.contracts.SongsContract;

      if(drizzleState.drizzleStatus.initialized){
        
        contract.methods.buyRoyalties(songAddress, sellerAddress).send({ value: totalPrice * 1000000000000000000, from: drizzleState.accounts[0], gas: 4712388,}, 
            function(error, result){
                if(error){
                  reject(error);
                } else{
                  console.log("The transaction was succesful");
                  const results ={txHash: result, songAddress: songAddress};
                  resolve(results);
                }
            }                
        );
      }
    });  
  }
  componentWillMount() {
    const {royalties, songId} = this.props
    this.props.getSellers(royalties, songId)
}

  render() {
    const { song, songId, classes, royalties, priceUSD, user } = this.props;

    const names = user['sellers'][songId]
    return (
      <div>
        <Table className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.head} align="left">
                Seller
              </TableCell>
              <TableCell className={classes.head} align="left">
                Royalties Percent (%)
              </TableCell>
              <TableCell className={classes.head} align="left">
                Total Price (ETH)
              </TableCell>
              <TableCell className={classes.head} align="left">
                Total Price (USD)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(royalties).map(r => (
              <TableRow hover className={classes.row} key={r} component="td">
                <TableCell align="right" className={classes.cell}>
                  {names && names['sellers'] && names['sellers'][r]? names['sellers'][r].artistName : ''} 
                </TableCell>
                <TableCell align="right" className={classes.cell}>
                  {royalties[r].percent}%
                </TableCell>
                <TableCell
                  align="right"
                  style={{ marginLeft: 20, paddingLeft: 50 }}
                  className={classes.cell}
                >
                  {royalties[r].price.toFixed(6)}
                </TableCell>
                <TableCell style={{ marginLeft: 20, paddingLeft: 50 }} align="right" className={classes.cell}>
                  ${(royalties[r].price * priceUSD).toFixed(2).toLocaleString()}
                </TableCell>
                
                <TableCell align="right" className={classes.cell}>
                
                  <Button className={classes.button} onClick={()=>this.handleBuyRoyalties(royalties, r)} >Buy</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  }

// private map state for every compo

const mapStateToProps = state => {
  console.log("STATE", state)
  //()=>{this.props.purchaseSong(song, songId, r)}
  return {
    ...state,
    user: state.user,
    profile: state.firebase.profile
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    purchaseSong: (song, songId, sellerId) => dispatch(dbPurchaseSong(song, songId, sellerId)),
    getSellers: (royalties, songId) => dispatch(dbGetSellers(royalties, songId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RoyaltyList));
