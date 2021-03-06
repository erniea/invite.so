import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  Grid
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withCookies } from "react-cookie";

const useStyles = (theme) => ({
  card: {
    width: 256,
  },
  media: {
    height: 256,
  },
});

class Home extends Component {
  render() {
    const { cookies } = this.props;
    const { classes } = this.props;

    const auth = cookies.get("sn") !== undefined;
    const profile = cookies.get("profile");
    const rand = Math.floor(Math.random() * 5);
    const arr = ["Windy", "Rocky", "Tangerine", "Harbang", "Hallabong"];

    const login = auth && (
      <Grid container direction="column"
      justify="center"
      alignItems="center">
        <Grid item>
          <Typography variant="h4">{`.. So, I want to invite you to ${arr[rand]} Island ..`}</Typography>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    );

    return (
      <div>
        {!auth && <Typography variant="h4">.. Welcome Home ..</Typography>}
        {auth && login}
      </div>
    );
  }
}

Home.propTypes = {
  cookies: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(withCookies(Home));
