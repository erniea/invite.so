import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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

    const toDateStr = (inDate) => {
      let date = new Date(inDate);
      let year = date.getFullYear(); //yyyy
      let month = 1 + date.getMonth(); //M
      month = month >= 10 ? month : "0" + month; //month 두자리로 저장
      let day = date.getDate(); //d
      day = day >= 10 ? day : "0" + day; //day 두자리로 저장
      let hour = date.getHours();
      hour = hour >= 10 ? hour : "0" + hour;

      return year + "-" + month + "-" + day + " " + hour + ":00";
    };

    return (
      <div>
        <Typography>Reservation for {cookies.get("profile").name}</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>res. no.</TableCell>
                <TableCell className={classes.head} align="right">
                  from date
                </TableCell>
                <TableCell className={classes.head} align="right">
                  to date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.reservation.map((row) => (
                <TableRow key={row.sn} hover={true}>
                  <TableCell component="th" scope="row">
                    {row.sn}
                  </TableCell>
                  <TableCell align="right">{toDateStr(row.fromDate)}</TableCell>
                  <TableCell align="right">{toDateStr(row.toDate)}</TableCell>
                  {console.log(row.toDate)}
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
