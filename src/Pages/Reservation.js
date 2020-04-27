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
} from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";

const useStyles = (theme) => ({
  
});

class Reservation extends Component {
  constructor() {
    super();
    this.state = { range: [] };
  }
  render() {
    const { classes } = this.props;

    const handleDateChange = (date) => {
      console.log(date);
      this.setState({ range: date });
    };

    return (
      <div>
        <Typography variant="h4">Reservation</Typography>
        <Grid container direction="column"   alignItems="center">
          <Grid item>
            <Box p={5} bgcolor="secondary.main" />
          </Grid>
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

Reservation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Reservation);
