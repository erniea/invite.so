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
  IconButton,
  Typography,
} from "@material-ui/core";

import axios from "axios";
import { DeleteForever } from "@material-ui/icons";
import { toDateStr, toTimeStr, toStateStr } from "./Utils";

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
    formdata.append("token", cookies.get("token"));
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
    const { classes, cookies } = this.props;

    const handleDelete = (e) => {
      const sn = e.currentTarget.getAttribute("sn");

      let formdata = new FormData();
      formdata.append("token", cookies.get("token"));
      
      axios
        .post(`https://api.invite.so/reservation/${sn}/cancel/`, formdata)
        .then((res) => {
          this.setState({ reservation: res.data });
        })
        .catch((res) => {
          console.log(res);
        });
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
                  arrival
                </TableCell>
                <TableCell className={classes.head} align="right">
                  to date
                </TableCell>
                <TableCell className={classes.head} align="right">
                  state
                </TableCell>
                <TableCell className={classes.head} align="right">
                  action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.reservation.length > 0 &&
                this.state.reservation.map((row) => (
                  <TableRow key={row.sn} hover={true}>
                    <TableCell component="th" scope="row">
                      {row.sn}
                    </TableCell>
                    <TableCell align="right">
                      {toDateStr(new Date(row.fromDate))}
                    </TableCell>
                    <TableCell align="right">
                      {toTimeStr(new Date(row.fromDate))}
                    </TableCell>
                    <TableCell align="right">{toDateStr(new Date(row.toDate))}</TableCell>
                    <TableCell align="right">{toStateStr(row.state)}</TableCell>
                    <TableCell align="right">
                      { row.state === 0 &&
                      <IconButton onClick={handleDelete} sn={row.sn}>
                        <DeleteForever />
                      </IconButton>}
                    </TableCell>
                  </TableRow>
                ))}
              {this.state.reservation.length === 0 && (
                <TableRow key="default" hover={true}>
                  <TableCell component="th" colSpan="5" align="center">
                    <Typography>no reservation</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
Check.propTypes = {
  classes: PropTypes.object.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withCookies(withStyles(useStyles)(Check));
