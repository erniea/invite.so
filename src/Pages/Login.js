import React, { Component } from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { withCookies } from "react-cookie";

import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      auth: cookies.get("sn") !== undefined,
    };
  }

  render() {
    const setAuthAndRedirect = (data) => {
      const { cookies } = this.props;

      cookies.set("sn", data.sn);
      cookies.set("token", data.token)
      this.props.history.push("/");
    }
    const requestRegister = () => {
      const { cookies } = this.props;
      let formdata = new FormData();
      formdata.append("googleId", cookies.get("profile").googleId);
      formdata.append("email", cookies.get("profile").email);
      formdata.append("token", cookies.get("googletoken"));

      axios.post("https://invite.so/req/register/", formdata).then((res) => {
        setAuthAndRedirect(res.data)   ;
      });
    };
    const requestSn = () => {
      let formdata = new FormData();
      const { cookies } = this.props;
      formdata.append("googleId", cookies.get("profile").googleId);
      formdata.append("token", cookies.get("googletoken"));
      axios
        .post("https://invite.so/req/getsn/", formdata)
        .then((res) => {
          setAuthAndRedirect(res.data);
        })
        .catch((res) => {
          requestRegister();
        });
    };

    const handleLoginSucceed = (e) => {
      const { cookies } = this.props;
      cookies.set("profile", e.profileObj);
      cookies.set("googletoken", e.accessToken);
      this.setState({ auth: true });
      requestSn();
    };
    const handleLoginFailed = (e) => {};

    return (
      <div>
        {!this.state.auth && (
          <GoogleLogin
            clientId="458418899225-9rrjs1r0afgo6efodsreg4betqf12kqk.apps.googleusercontent.com"
            onSuccess={handleLoginSucceed}
            onFailure={handleLoginFailed}
            cookiePolicy={"single_host_origin"}
          />
        )}
        {this.state.auth && /*<Button onClick={requestSn}>Get</Button>*/ <CircularProgress />}
      </div>
    );
  }
}

Login.propTypes = {
  cookies: PropTypes.object.isRequired,
};

export default withRouter(withCookies(Login));
