import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withCookies } from "react-cookie";

const useStyles = (theme) => ({
  card: {
    maxWidth: 256,
  },
  media: {
    height: 256,
  },
});

class Home extends Component {
  render() {
    const { cookies } = this.props;
    const { classes } = this.props;

    const auth = cookies.get("loginid");
    const profile = cookies.get("profile");

    const rand = Math.random() * 5;

    const arr = ["Windy", "Rocky", "Tangerine", "Harbang", "Hallabong"];


    return (
      <div>
        <h1>{`.. So, I want to invite you to ${arr[rand]} Island ..`}</h1>
        {auth && (<div>
          <h2>Welcome Home</h2>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} image={profile.imageUrl} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {profile.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {profile.email}
                </Typography>{" "}
              </CardContent>
            </CardActionArea>
          </Card>
          </div>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  cookies: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(withCookies(Home));
