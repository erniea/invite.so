import React, { Component } from "react";
import { Typography, Box, Grid, TextField, Button, Hidden } from "@material-ui/core";
import {
  StaticDateRangePicker,
  LocalizationProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";

class Reservation extends Component {
  constructor() {
    super();
    this.state = { range: [] };
  }
  render() {
    const handleDateChange = (date) => {
      console.log(date);
      this.setState({ range: date });
    };

    return (
      <div>
        <Typography variant="h4">Reservation</Typography>
        <Grid container direction="column">
          <Grid item>
            <LocalizationProvider dateAdapter={DateFnsUtils}>
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
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <Typography>
              {this.state.range[0] && this.state.range[0].toString()}
            </Typography>
            <Typography>
              {this.state.range[1] && this.state.range[1].toString()}
            </Typography>
          </Grid>
          <Grid item>
            <Button>Request</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
/*


          */
export default Reservation;
