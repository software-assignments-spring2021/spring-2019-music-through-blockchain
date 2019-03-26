import React, { Component } from 'react'
import SongBox from '../components/SongBox'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Slider from "react-slick"
import coverArt from '../img/albumArt.png'
import coverArtTwo from '../img/tameImpala.jpg'

const styles = theme => ( {
    root: {
        width: '100%', 
        paddingBottom: 20, 
        backgroundColor: 'lightgrey', 
        alignContent: 'center'
    },
    slider: {
        position: 'relative',
        bottom: 10,
        backgroundColor: 'inherit',
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
        autoplay: true
      };
    return (
        <div>
            <div className={classes.root}>
                <h1 style={{position: 'relative', right: '40%', top: 10}}>Featured</h1>
                <Slider {...settings} className={classes.slider}>
                    {(songs && Object.keys(songs).length > 0) ? Object.keys(songs).map((songId) => (
                    <div key={songId}>
                        <SongBox title={songs[songId]['title']} artist={songs[songId]['artist']} coverArt={songs[songId]['coverArt']} size='large' />
                    </div>
                    )) : ''}
                </Slider>
            </div>
        </div>
    )
  }
}

export default withStyles(styles)(Carousel)
