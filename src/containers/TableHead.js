import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";

const styles = theme => ({});
class CustomTableHead extends React.Component {
  render() {
    const { onSelectAllClick, numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              style={{ color: "#7F53AC" }}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          <TableCell>
            <Typography
              variant="subtitle"
              style={{ position: "relative", right: 25 }}
            >
              Song
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle">% Royalty</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}
export default withStyles(styles)(CustomTableHead);
