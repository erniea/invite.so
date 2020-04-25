import React, { Component } from "react";
import PropTypes from "prop-types";

import { withCookies, Cookies } from "react-cookie";

import { Button } from "@material-ui/core";

class Login extends Component {
  constructor() {
    super();
    this.state = {auth: false};
  }

  componentDidMount(){
      this.setState({auth:this.props.cookies.get("loginid")});
  }

  render() {
    const handleLogin = (e) => {
      this.props.cookies.set("loginid", true);
      this.setState({auth:true});
    };
    const handleLogout = (e) => {
        this.props.cookies.set("loginid", false);
        this.setState({auth:false});
      };
    const { auth } = this.props.cookies.get("loginid");

    return (
      <div>
        <h2>Insert Login Here</h2>
        {!this.state.auth && (<Button onClick={handleLogin}> Login </Button>) }
        {this.state.auth && (<Button onClick={handleLogout}> Logout </Button>) }
        {}
      </div>
    );
  }
}

Login.propTypes = {
  cookies: PropTypes.object.isRequired,
};

export default withCookies(Login);
