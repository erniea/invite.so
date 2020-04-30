import React, { Component } from "react";
import PropTypes from "prop-types";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";

import {
  Typography,
  Grid,
  TextField,
  Button,
  Hidden,
  CircularProgress,
  Box,
} from "@material-ui/core";
import {
  StaticDateRangePicker,
  LocalizationProvider,
  TimePicker,
} from "@material-ui/pickers";
import { toReqStr, getBooked } from "./Utils";

import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import axios from "axios";
import { Send } from "@material-ui/icons";

class Reservation extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      range: [],
      time: new Date(),
      sending: false,
      booked: {},
    };
  }

  componentDidMount() {
    getBooked((e) => {
      this.setState({ booked: e });
    });
  }

  render() {
    const { cookies, history } = this.props;

    const handleDateChange = (date) => {
      this.setState({ range: date });
    };

    const handleTimeChange = (time) => {
      this.setState({ time: time });
    };

    const handleRequest = (e) => {
      e.preventDefault();

      this.state.range[0].setHours(this.state.time.getHours());
      this.state.range[0].setMinutes(this.state.time.getMinutes());
      this.setState({ sending: true });
      let formdata = new FormData();
      formdata.append("token", cookies.get("token"));
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

    const canNotReserve = (e) => {
      const month = e.getMonth();
      const date = e.getDate();
      return (
        this.state.booked[month] && this.state.booked[month].includes(date)
      );
    };

    const canSubmit = () => {
      const range = this.state.range[0] && this.state.range[1];

      if (!range) {
        return false;
      }
      for (let i = new Date(this.state.range[0]); i < this.state.range[1]; i.setDate(i.getDate() + 1)) {
        console.log(i);
        if ( canNotReserve(i) ) {
          return false;
        }
      }

      return true;
    };
    return (
      <div>
        <Typography variant="h4">Reservation</Typography>
        <LocalizationProvider dateAdapter={DateFnsUtils}>
          <form onSubmit={handleRequest}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Hidden mdDown>
                  <StaticDateRangePicker
                    displayStaticWrapperAs="desktop"
                    disablePast="true"
                    value={this.state.range}
                    onChange={(date) => handleDateChange(date)}
                    renderInput={(props) => <TextField {...props} />}
                    shouldDisableDate={canNotReserve}
                  />
                </Hidden>
                <Hidden mdUp>
                  <StaticDateRangePicker
                    displayStaticWrapperAs="mobile"
                    disablePast="true"
                    value={this.state.range}
                    onChange={(date) => handleDateChange(date)}
                    autoOk="true"
                    renderInput={(props) => <TextField {...props} />}
                    shouldDisableDate={canNotReserve}
                  />
                </Hidden>
              </Grid>
              <Grid item>
                <TimePicker
                  ampm="false"
                  value={this.state.time}
                  onChange={handleTimeChange}
                  autoOk="true"
                />
              </Grid>
              <Grid item>
                <Box p={2}>
                  {!this.state.sending && (
                    <Button
                      endIcon={<Send />}
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!canSubmit()}
                    >
                      Request
                    </Button>
                  )}
                  {this.state.sending && <CircularProgress />}
                </Box>
              </Grid>
            </Grid>
          </form>
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
