import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Grow from '@material-ui/core/Grow'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Zoom from '@material-ui/core/Zoom'
import styled from "@emotion/styled/macro";
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SongPreview from './SongPreview';
import Modal from '@material-ui/core/Modal'
import DialogContent from '@material-ui/core/DialogContent';



const styles = theme => ( {
    root: {
        display: 'inline-block',
        margin: 15,
        backgroundColor: 'white',
        elevation: 3,
        overflow: 'hidden',
    },

    title: {
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '98%',
        left: 0,
        right: 0,
        bottom: 15,
        textAlign: 'center',
        zIndex: 1
    },

    subtitle: {
        position: 'relative',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        bottom: 40,
        zIndex: 1
    },

    cover: {
        top: 0,
        width: '100%',
    },

    audio: {
        display: 'flex',
        position: 'absolute',
        bottom: 5,
        width: '98%',
        left: '1%',
        height: 50,
        contentAlign: 'center',
        alignItems: 'center',
        zIndex: 3,
    },

    icon: {
        width: 48, 
        height: 48, 
        color: 'white'
    },

    modal: {
        margin: 'auto',
        width: 400,
        padding: '13% 0',
    },

})

//e-motion components
const Title = styled.h4({
    fontFamily: "Helvetica",
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
    fontSize: 30
});

const SubTitle = styled.p({
    fontFamily: "Helvetica",
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
    fontSize: 22
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
export class CarouselItem extends Component {
    constructor(props) {
        super(props);
        this.state = { shadow: 1}
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
        const {songId, song, classes, theme, auth} = this.props
        console.log(song, 'song in carousel')
        const title = song['title']
        const artist = song['artistName']
        const coverArt = song['imageUrl']
        const media = song['songUrl']
        const ownerId = song['ownerId']
        return (
        <div style={{display: 'inline'}}>
            <Card 
                className={classes.root} 
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                elevation={this.state.shadow}
                style={{width: 310, height: 310}}
            >
                <Background>
                    <img className={classes.cover} src={coverArt}></img>
                    <DisplayOver>
                        <Hover>
                            <Title style={{}} className={classes.title} >{title}</Title>
                            <SubTitle className={classes.subtitle} onClick={this.handleOpenModal}>{artist}</SubTitle>
                            <audio src={media} controls className={classes.audio}/>
                        </Hover>
                    </DisplayOver>
                </Background>
                <Modal className={classes.modal} open={this.state.detailsOpen} onClose={this.handleCloseModal}>
                  <DialogContent>
                      <SongPreview song={song} closeModal={this.handleCloseModal} songId={song.id} />
                  </DialogContent>
              </Modal>   
                    
            </Card>

         
         </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(CarouselItem)
