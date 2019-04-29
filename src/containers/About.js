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

const styles = theme => ({

})

class About extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { classes } = this.props
        let aboutInfo = ""

        return (
            <div className={classes.root}>
                <Typography variant='h3' align='center' className={classes.head}>
                    Our bMusic Story
                </Typography>
            </div>
        )
    }






}

export default withStyles(styles, {withTheme:true})(About)


