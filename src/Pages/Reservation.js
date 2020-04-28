import React, { Component } from "react";
import PropTypes from "prop-types";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";

import { Typography, Grid, TextField, Button, Hidden } from "@material-ui/core";
import {
  StaticDateRangePicker,
  LocalizationProvider,
  TimePicker,
} from "@material-ui/pickers";
import {toDateStr, toTimeStr, toReqStr} from "./Utils";

import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import axios from "axios";

class Reservation extends Component {
  constructor({props}) {
    super(props);
    this.state = { range: [], time: new Date() };
  }
  render() {
    const { cookies, history } = this.props;

    const handleDateChange = (date) => {
      this.setState({ range: date });
    };

    const handleTimeChange = (time) => {
      this.setState( {time : time});
    };
  
    const handleRequest = (e) => {
      this.state.range[0].setHours(this.state.time.getHours());
      this.state.range[0].setMinutes(this.state.time.getMinutes());

      let formdata = new FormData();
      formdata.append("memberSn", cookies.get("sn"));
      formdata.append("fromDate", toReqStr(this.state.range[0]));
      formdata.append("toDate", toReqStr(this.state.range[1]));
      axios
        .post("https://api.invite.so/reservation/", formdata)
        .then((res) => {
          console.log("succ");
          console.log(res);
          this.setState({ reservation: res.data });
          history.push("/check");
        })
        .catch((res) => {
          console.log("err");
          console.log(res);
        });
    };
    return (
      <div>
        <Typography variant="h4">Reservation</Typography>
        <LocalizationProvider dateAdapter={DateFnsUtils}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Hidden mdDown>
                <StaticDateRangePicker
                  displayStaticWrapperAs="desktop"
                  value={this.state.range}
                  onChange={(date) => handleDateChange(date)}
                  renderInput={(props) => <TextField {...props} />}
                />
              </Hidden>
              <Hidden mdUp>
                <StaticDateRangePicker
                  displayStaticWrapperAs="mobile"
                  value={this.state.range}
                  onChange={(date) => handleDateChange(date)}
                  renderInput={(props) => <TextField {...props} />}
                />
              </Hidden>
            </Grid>
            <Grid item>
              <TimePicker
                ampm={false}
                value={this.state.time}
                onChange={handleTimeChange}
              />
            </Grid>
            <Grid item>
              <Typography>
                CheckIn {this.state.range[0] && toDateStr(this.state.range[0])}
              </Typography>
              <Typography>
                CheckOut {this.state.range[1] && toDateStr(this.state.range[1])}
              </Typography>
              <Typography>
                Arrival {this.state.time && toTimeStr(this.state.time)}
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={handleRequest}>Request</Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </div>
    );
  }
}

Reservation.propTypes = {
  cookies: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withCookies(Reservation));
