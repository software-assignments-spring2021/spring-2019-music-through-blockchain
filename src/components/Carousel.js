import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import CarouselItem from './CarouselItem'
import Slider from "react-slick"
import coverArt from '../img/albumArt.png'
import coverArtTwo from '../img/tameImpala.jpg'

const styles = theme => ( {
    root: {
        width: '100%', 
        paddingBottom: 20, 
        backgroundColor: 'lightgrey',
        boxShadow: '3px 4px 5px 0px rgba(33,33,33,1)',
        borderRadius: 15,
        alignContent: 'center'
    },
    slider: {
        position: 'relative',
        bottom: 10,
        backgroundColor: 'lightgrey',
        width: '90%',
        zIndex: 3,
        margin: 'auto'
      }
})

export class Carousel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
    const { classes, theme, songs } = this.props
    var settings = {
        dots: true,
        arrows: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
        autoplay: true,
        infinite: (songs && Object.keys(songs).length > 2)
      };
    return (
        <div>
            <div className={classes.root}>
                <h1 style={{position: 'relative', right: '40%', top: 10}}>Featured</h1>
                <Slider {...settings} className={classes.slider}>
                    {(songs && Object.keys(songs).length > 0) ? Object.keys(songs).map((songId) => (
                        <CarouselItem key={songId} song={songs[songId]} songId={songId}/>
                    )) : ''}
                </Slider>
            </div>
        </div>
    )
  }
}

export default withStyles(styles)(Carousel)
