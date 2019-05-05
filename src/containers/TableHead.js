import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";

import withStyles from '@material-ui/core/styles/withStyles';

import React from 'react'
const styles = theme => ({

})
class CustomTableHead extends React.Component {

  render() {
    const {
      onSelectAllClick,
      numSelected,
      rowCount
    } = this.props;
    const rows = ["Song", "% Royalty" ]
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
            style={{color:'#7F53AC'}}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          <TableCell>
                  <Typography variant='subtitle'style={{position: 'relative', right:25}}>
                    Song
                  </Typography>
              </TableCell>
              <TableCell>
                  <Typography variant='subtitle'>
                  % Royalty
                  </Typography>
              </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}
export default withStyles(styles)(CustomTableHead);