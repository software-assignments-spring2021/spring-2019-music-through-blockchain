import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import SvgShare from '@material-ui/icons/Share'
import SvgComment from '@material-ui/icons/Comment'
import SvgFavorite from '@material-ui/icons/Favorite'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import SvgFavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { grey } from '@material-ui/core/colors'
import Paper from '@material-ui/core/Paper'
import Menu from '@material-ui/core/Menu'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import Grow from '@material-ui/core/Grow'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Zoom from '@material-ui/core/Zoom'
import styled from "@emotion/styled/macro";
import Modal from '@material-ui/core/Modal'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DialogContent from '@material-ui/core/DialogContent';

import SongDetails from './SongDetails'

const styles = theme => ( {
    root: {
        display: 'inline-block',
        margin: 15,
        backgroundColor: 'white',
        elevation: 3,
        overflow: 'hidden',
    },

    title: {
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        top: -15,
        textAlign: 'center',
        zIndex: 1
    },

    subtitle: {
        position: 'absolute',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        top: '13.5%',
        zIndex: 1
    },

    cover: {
        top: 0,
        width: '100%',
    },

    controls: {
        display: 'flex',
        position: 'absolute',
        bottom: 49,
        width: '100%',
        contentAlign: 'center',
        alignItems: 'center',
        zIndex: 3,
      },
      
    modal: {
        margin: 'auto',
        width: 400,
        padding: '13% 0',
        tabIndex: "-1"
    }

})

//e-motion components
const Title = styled.h4({

    fontFamily: "Helvetica",
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
});

const SubTitle = styled.p({
    fontFamily: "Helvetica",
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
  });

const PlayButtons = styled.div({
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
});

const DisplayOver = styled.div({
    height: "100%",
    left: "0",
    position: "absolute",
    top: "0",
    width: "100%",
    zIndex: 2,
    transition: "background-color 350ms ease",
    backgroundColor: "transparent",
    boxSizing: "border-box",
});

const Hover = styled.div({
    opacity: 0,
    transition: "opacity 350ms ease",
  });

  const Background = styled.div({
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: 'lightgrey',
    color: "#FFF",
    position: "relative",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    [`:hover ${DisplayOver}`]: {
      backgroundColor: "rgba(0,0,0,.5)",
    },
    [`:hover ${Title}, :hover ${SubTitle}`]: {
      transform: "translate3d(0,0,0)",
    },
    [`:hover ${Hover}`]: {
      opacity: 1,
    },
  });

// SongBox component
export class SongBox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            shadow: 1, 
            detailsOpen: false 
        }
    }

    onMouseOver = () => {
        this.setState({ shadow: 5 })
    };
    onMouseOut = () => {
        this.setState({ shadow: 1 })
    }
    handleOpenModal = () => {
        this.setState({ detailsOpen: true })
    }
    handleCloseModal = () => {
        this.setState({ detailsOpen: false })
    }

    render() {
        const {classes, theme, title, artist, coverArt, size} = this.props
        const cardSize = 130
        const titleSize = 17
        const subtitleSize = 14
        const iconSize = 30
        
        return (
        <div style={{display: 'inline'}}>
            <Card 
                className={classes.root} 
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                elevation={this.state.shadow}
                onClick={this.handleOpenModal}
                style={{width: cardSize, height: cardSize }}
            >
                <Background>
                    <img className={classes.cover} src={coverArt}></img>
                    <DisplayOver>
                        <Hover>
                            <Title style={{fontSize: titleSize}} className={classes.title}>{title}</Title>
                            <SubTitle style={{fontSize: subtitleSize}} className={classes.subtitle}>{artist}</SubTitle>
                            <PlayButtons className={classes.controls}>
                                <IconButton aria-label="Play/pause" style={{margin: 'auto'}}>
                                    <PlayArrowIcon style={{width: iconSize, height: iconSize, color: 'white'}} />
                                </IconButton>
                            </PlayButtons>
                        </Hover>
                    </DisplayOver>
                </Background>    
            </Card>
            <Modal className={classes.modal} open={this.state.detailsOpen} onClose={this.handleCloseModal}>
                <DialogContent>
                    <SongDetails title={title} artist={artist} coverArt={coverArt}/>
                </DialogContent>
            </Modal>
         </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(SongBox)
