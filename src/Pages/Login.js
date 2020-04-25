import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { withCookies, Cookies } from "react-cookie";

import { Button } from "@material-ui/core";

class Login extends Component {
  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      auth: cookies.get("loginid"),
      id: "",
      name: "",
      provider: "",
    };
  }

  componentDidMount() {}

  render() {
    const handleLogin = (e) => {
      /*      this.props.cookies.set("loginid", true);
      this.setState({ auth: true });
      this.props.history.push('/');
*/

      console.log(e);
    };

    return (
      <div>
        <h2>Insert Login Here</h2>
        <GoogleLogin
          clientId="458418899225-9rrjs1r0afgo6efodsreg4betqf12kqk.apps.googleusercontent.com"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={"single_host_origin"}
        />
        <Button>Login</Button>
      </div>
    );
  }
}

Login.propTypes = {
  cookies: PropTypes.object.isRequired,
};

export default withRouter(withCookies(Login));
