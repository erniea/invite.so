import React, { Component } from "react";

import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { fade, withStyles } from "@material-ui/core/styles";
import { withCookies, Cookies } from "react-cookie";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  AccountCircle,
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

    this.state = { anchorEl: null, auth: cookies.get("loginid") };
  }

  componentDidMount() {}

  componentDidUpdate() {
    const auth = this.props.cookies.get("loginid");
    if (auth != this.state.auth) {
      this.setState({ auth: auth });
    }
  }

  render() {
    const { classes } = this.props;
    const { auth } = this.props;

    const handleChange = (event) => {};

    const handleLogout = (event) => {
      this.props.cookies.remove("loginid");
      this.props.history.push('/');
    };

    const handleMenu = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
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
                <IconButton onClick={handleMenu} color="inherit">
                  <AccountCircle />
                  <Typography value={this.props.cookies.get("loginid")}></Typography>
                </IconButton>
                <IconButton color="inherit" onClick={handleLogout}>
                  <FlightTakeoff />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={this.state.anchorEl !== null}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
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
