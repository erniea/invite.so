import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { withCookies } from "react-cookie";

class Login extends Component {
  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      auth: cookies.get("auth"),
    };
  }

  componentDidMount() {}

  render() {
    const handleLoginSucceed = (e) => {
      const { cookies } = this.props;
      cookies.set("auth", true);
      cookies.set("profile", e.profileObj);
      this.setState({ auth: true });
      this.props.history.push("/");
    };
    const handleLoginFailed = (e) => {};
    return (
        <GoogleLogin
          clientId="458418899225-9rrjs1r0afgo6efodsreg4betqf12kqk.apps.googleusercontent.com"
          onSuccess={handleLoginSucceed}
          onFailure={handleLoginFailed}
          cookiePolicy={"single_host_origin"}
        />
    );
  }
}

Login.propTypes = {
  cookies: PropTypes.object.isRequired,
};

export default withRouter(withCookies(Login));
