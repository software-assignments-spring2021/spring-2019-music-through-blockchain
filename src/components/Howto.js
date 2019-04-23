import React, { Component } from 'react';
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

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    desc: {
      width:'100%', 
      marginTop: '20px',
      align: 'left', 
      overflowX: 'auto'
    }, 
    root: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "15px",
        display: "flex",
        marginBottom: 50
      }, 
      grid: {
        marginTop: 40
      }
  });
  
class HowTo extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.classes)
        const { classes } = this.props;
        let text = "The music industry has seen a big change in the last decade thanks to the massive embrace that streaming platforms have had. Although it took a while, such platforms are finally being profitable but artists have not been able to see their profits grow proportionally. The amount of intermediaries between the artist and the end-user platforms that serve as revenue streams for the industry don't allow enough transparency for the artists, and makes their earnings less liquid. In order to make the industry more transparent to artist and cut some of the intermediaries, we are enabling the artists to directly market their assets through our platform and directly receive their revenues using smart contracts, taking into account the percentage of royalties of each owner of the songs. By constructing a new marketplace to sell music, we can potentially increase the margin of profits for the artists." ;
        return(
            <div className={classes.root}>

            <Grid container spacing={24} className={classes.grid}>
            <Typography variant='h3' align='center' className={classes.desc}>
                    How To Get Started with bMusic
                </Typography>
                <Typography variant='h4' align='left'>
                    Part 1 Download Metamask
                </Typography>
                <Typography variant='body2'  className={classes.desc} align='left'>{text} </Typography>
                <Typography variant='h4' align='left'>
                    Part 2
            </Typography>
            <Typography variant='body2' className={classes.desc}>{text} </Typography>

            <Typography variant='h4' align='left'>
                    Part 3
                </Typography>
                <Typography variant='body2'  className={classes.desc}>{text} </Typography>
                </Grid>
            </div>


            );
    }
}

export default withStyles(styles, {withTheme:true})(HowTo);

