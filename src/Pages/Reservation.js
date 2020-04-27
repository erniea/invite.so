import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Hidden,
} from "@material-ui/core";
import {
  StaticDateRangePicker,
  LocalizationProvider,
  TimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";

const useStyles = (theme) => ({});

class Reservation extends Component {
  constructor() {
    super();
    this.state = { range: [], time: null };
  }
  render() {
    const { classes } = this.props;

    const handleDateChange = (date) => {
      console.log(date);
      this.setState({ range: date });
    };

    const handleTimeChange = (time) => {
      console.log(time);
      this.setState({ time: time });
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
                {this.state.range[0] && this.state.range[0].toString()}
              </Typography>
              <Typography>
                {this.state.range[1] && this.state.range[1].toString()}
              </Typography>
              <Typography>
                {this.state.time && this.state.time.toString()}
              </Typography>
            </Grid>
            <Grid item>
              <Button>Request</Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </div>
    );
  }
}

Reservation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Reservation);
