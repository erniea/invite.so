import React, { Component } from "react";

import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withCookies } from "react-cookie";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  Event,
  EventAvailable,
  FlightTakeoff,
  FlightLand,
} from "@material-ui/icons";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "block",
  },
});

class InviteAppBar extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;

    this.state = { auth: cookies.get("auth") };
  }

  componentDidMount() {}

  componentDidUpdate() {
    const auth = this.props.cookies.get("auth");
    if (auth !== this.state.auth) {
      this.setState({ auth: auth });
    }
  }

  render() {
    const { classes } = this.props;
    const handleLogout = (event) => {
      this.props.cookies.remove("auth");
      this.props.history.push("/");
    };

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              invite.so
            </Typography>
            {!this.state.auth && (
              <div>
                <IconButton color="inherit" component={RouterLink} to="/login">
                  <FlightLand />
                </IconButton>
              </div>
            )}
            {this.state.auth && (
              <div>
                <IconButton color="inherit" component={RouterLink} to="/reserve">
                  <Event />
                </IconButton>
                <IconButton color="inherit" component={RouterLink} to="/check">
                  <EventAvailable />
                </IconButton>
                <IconButton color="inherit" onClick={handleLogout}>
                  <FlightTakeoff />
                </IconButton>
                
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Toolbar />
      </div>
    );
  }
}

InviteAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withCookies(withStyles(useStyles)(withRouter(InviteAppBar)));
