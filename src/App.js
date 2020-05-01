import React from "react";

import "./App.css";

import { Route } from "react-router-dom";
import { Box, Container } from "@material-ui/core";

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import { Home, Login, Check, Reservation } from "./Pages";
import InviteAppBar from "./Components/AppBar";
import Copyright from "./Components/Copyright";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f57c00',
    },
    secondary: {
      main: '#01579b',
    },
    tonalOffset: 0.2,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <InviteAppBar />
      <Box m={4} />
      <Container maxWidth="md" className="Content">
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/check" component={Check} />
        <Route path="/reservation" component={Reservation} />
      </Container>
      <Box m={4} />
      <Copyright />
    </ThemeProvider>
  );
}

export default App;
