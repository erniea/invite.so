import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { withCookies } from "react-cookie";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";

import axios from "axios";

const useStyles = (theme) => ({
  head: {
    fontWeight: "bolder",
  },
});
class Check extends Component {
  constructor({ props }) {
    super(props);

    this.state = { reservation: [] };
  }

  componentDidMount() {
    const { cookies } = this.props;

    let formdata = new FormData();
    formdata.append("memberSn", cookies.get("sn"));
    axios
      .post("https://api.invite.so/reservation/my/", formdata)
      .then((res) => {
        console.log("succ");
        console.log(res);
        this.setState({ reservation: res.data });
      })
      .catch((res) => {
        console.log("err");
        console.log(res);
      });
  }

  render() {
    const { classes } = this.props;
    const { cookies } = this.props;

    return (
      <div>
        <Typography>Reservation for {cookies.get("profile").name}</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>reservation no.</TableCell>
                <TableCell className={classes.head} align="right">
                  from date
                </TableCell>
                <TableCell className={classes.head} align="right">
                  to date
                </TableCell>
                <TableCell className={classes.head} align="right">
                  member sn
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.reservation.map((row) => (
                <TableRow key={row.sn} hover={true}>
                  <TableCell component="th" scope="row">
                    {row.sn}
                  </TableCell>
                  <TableCell align="right">{row.fromDate}</TableCell>
                  <TableCell align="right">{row.toDate}</TableCell>
                  <TableCell align="right">{row.memberSn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
Check.propTypes = {
  cookies: PropTypes.object.isRequired,
};
export default withCookies(withStyles(useStyles)(Check));
