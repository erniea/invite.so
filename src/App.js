import React from "react";

import "./App.css";

import { Route } from "react-router-dom";
import { Box, Container } from "@material-ui/core";

import { Home, Login, Check, Reservation } from "./Pages";
import InviteAppBar from "./Components/AppBar";
import Copyright from "./Components/Copyright";

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
