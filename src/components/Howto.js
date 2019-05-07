import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SvgIcon from '@material-ui/core/SvgIcon';
import withStyles from "@material-ui/core/styles/withStyles";
import metaIcon from '../img/metamask.jpg'
import popup from '../img/popup.png'
function MusicIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zm-7.5-1c1.38 0 2.5-1.12 2.5-2.5V7h3V5h-4v5.51c-.42-.32-.93-.51-1.5-.51-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>   
    </SvgIcon>
    );
  }

  function DollarIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>   
    </SvgIcon>
    );
  }
  function RoyaltiesIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"/>   
  </SvgIcon>
    );
  }

const styles = theme => ({
    desc: {
      width:'100%', 
      marginTop: '20px',
      align: 'left', 
      overflowX: 'auto', 
      color:'white'
    }, 
    head: {
        marginBottom: 50,
        width:'100%', 
        align: 'left', 
        overflowX: 'auto'
    }, 
    nested: {
        paddingLeft: 20
    }, 
    popup: {
        width: "70%",
        position: "relative"
    },
     pic: {
        width: "40%",
        position: "relative"
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
      }, 
      item: {
          fontSize: 15
      }, 
      list :{
        width:'100%', 
        marginTop: '20px',
        align: 'left', 
        overflowX: 'auto', 
        marginBottom: 20,
      }
  });
  
class HowTo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openSong: false, 
            openRoyalties: false
        }
    }
    handleClickSong = () => {
        this.setState(state => ({ openSong: !state.openSong }));
      };
      handleClickRoyalties = () => {
        this.setState(state => ({ openRoyalties: !state.openRoyalties }));
      };
    
    renderList = (p, step) => {
        return(
            <div>

        </div>
        );
    }
    styled = svgProps => (
        <svg {...svgProps}>
          <defs>
            <linearGradient id="gradient1">
              <stop offset="30%" stopColor='#647DEE' />
              <stop offset="70%" stopColor='#7F53AC' />
            </linearGradient>
          </defs>
          {React.cloneElement(svgProps.children[0], { fill: 'url(#gradient1)' })}
        </svg>
      )

    render() {
        console.log(this.props.classes)
        const { classes } = this.props;
        let steps = [
            'Download Metamask. You must be logged in MetaMask to navigate through bMusic offerings and purchase songs and royalties',
            'Explore bMusic Offers.', 
            "When one of the previous actions are triggered, a MetaMask pop up should appear asking for the user's confirmation of the transaction. Once accepted, the song is yours.", 
            "We highly recommend our users to only use one ethereum account per profile with bMusic."
        ]
        const metamask = 'src/'
        return(
            <div className={classes.root}>

            <Grid container spacing={24} className={classes.grid}>
            <Typography style={{color:'white'}} variant='h3' align='center' className={classes.head}>
                    How To Get Started with bMusic
            </Typography>
            <Grid item xs={6}>
            <Typography variant='h4' align='left' marginTop='20px' style={{color:'#788CFF'}} >Step 1</Typography>

            <Typography className = {this.props.classes.desc} variant ='h5' align='left' style={{marginBottom: 20, color:'white'}}>
                Download Metamask. 
            </Typography>
            <Typography  className = {this.props.classes.desc} variant ='h5' align='left' style={{marginBottom: 20, color:'white'}}>
                You must be logged in MetaMask to navigate through bMusic offerings and purchase songs and royalties
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <div className={classes.leftColumn}>
                    <img
                      className={classes. pic}
                      data-image="black"
                      src={metaIcon}
                      alt=""
                    />
                  </div>
            </Grid>
            <Grid item xs={12}>
            <Typography variant='h4' align='left' style={{color:'#788CFF'}}>Step 2</Typography>
            <Typography className = {this.props.classes.desc} variant ='h5' align='left'>
                {steps[1]}
            </Typography>
<List className={classes.list}>
    <ListItem button onClick={this.handleClickSong}>
          <ListItemIcon>
          <MusicIcon
            component={this.styled}
      />          
      </ListItemIcon>
          <ListItemText inset primary="Songs" />
          {this.state.openSong ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.openSong} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <MusicIcon component={this.styled} />
              </ListItemIcon>
              <ListItemText inset primary="Upload Song" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
              <DollarIcon component={this.styled} />
              </ListItemIcon>
              <ListItemText inset primary="Purchase Song" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={this.handleClickRoyalties}>
          <ListItemIcon>
            <RoyaltiesIcon component={this.styled} />
          </ListItemIcon>
          <ListItemText inset primary="Royalties" />
          {this.state.openRoyalties ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.openRoyalties} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
              <DollarIcon component={this.styled} />
              </ListItemIcon>
              <ListItemText inset primary="Purchase Royalties" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
              <DollarIcon component={this.styled} />
              </ListItemIcon>
              <ListItemText inset primary="Sell Royalties" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
              <RoyaltiesIcon component={this.styled} />
              </ListItemIcon>
              <ListItemText inset primary="Withdraw Royalties" />
            </ListItem>
          </List>
        </Collapse>
    </List>
            </Grid>
            <Grid item xs={12}>
            <Typography variant='h4' align='left' marginTop='20px' style={{color:'#788CFF'}} >Step 3</Typography>
            <Typography className = {this.props.classes.desc} variant ='h5' align='left' style={{marginBottom: 20}}>
                Confirm Purchase.
            </Typography>
            <Typography className = {this.props.classes.desc} variant ='subheading' align='left' style={{marginBottom: 20}}>
                {steps[2]}
            </Typography>
            <div className={classes.leftColumn}>
                    <img
                      className={classes.popup}
                      data-image="black"
                      src={popup}
                      alt=""
                    />
            </div>
            </Grid>
        <Grid item xs={12}>
            <Typography className = {this.props.classes.desc} variant ='subheading' align='center' style={{marginBottom: 20}}>
                {steps[3]}
            </Typography>
            <Typography className = {this.props.classes.desc} variant ='h5' align='center' style={{marginBottom: 20}}>
            Enjoy!
            </Typography>
            </Grid>
        </Grid>
            
            </div>
            );
    }
}

export default withStyles(styles, {withTheme:true})(HowTo);

