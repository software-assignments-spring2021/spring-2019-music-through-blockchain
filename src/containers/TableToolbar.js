import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from "@material-ui/core/Toolbar";

import { lighten } from "@material-ui/core/styles/colorManipulator";
const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//         color: 'rgb(255,255,255)',
//         backgroundColor: lighten( '#7F53AC', 0.85)
//         }
//       : {
//           color: 'rgb(255,255,255)',
//           backgroundColor: '#7F53AC'
//         },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let CustomTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography variant="subtitle1" style={{ color:'#7F53AC'}}>
            {numSelected} selected
          </Typography>
        ) : ''}
      </div>
      <div className={classes.spacer} />
     
    </Toolbar>
  );
};


export default withStyles(toolbarStyles)(CustomTableToolbar);

