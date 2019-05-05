import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from "@material-ui/core/Toolbar";

import { lighten } from "@material-ui/core/styles/colorManipulator";
const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
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
    <Toolbar>
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

