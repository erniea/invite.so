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
import { toDateStr, toTimeStr } from "./Utils";

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
    const { classes, cookies } = this.props;

    const handleDelete = (e) => {
      const sn = e.currentTarget.getAttribute("sn");

      axios
        .delete(`https://api.invite.so/reservation/${sn}/`)
        .then((res) => {
          console.log("succ");
          console.log(res);
          let newres = this.state.reservation.filter(
            (item) => item.sn !== parseInt(sn)
          );
          console.log(newres);
          this.setState({ reservation: newres });
        })
        .catch((res) => {
          console.log("err");
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
                  to date
                </TableCell>
                <TableCell className={classes.head} align="right">
                  cancel
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
                    <TableCell align="right">{toDateStr(new Date(row.toDate))}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={handleDelete} sn={row.sn}>
                        <DeleteForever />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {this.state.reservation.length === 0 && (
                <TableRow key="default" hover={true}>
                  <TableCell component="th" colSpan="4" align="center">
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
