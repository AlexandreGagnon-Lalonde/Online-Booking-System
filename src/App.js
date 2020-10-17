import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import SignUp from "./components/SignUp/index";
import LogIn from "./components/LogIn/index";
import HomePage from "./components/HomePage/index";
import Profile from "./components/Profile/index";
import WelcomePage from "./components/WelcomePage/index";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/">
          <WelcomePage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/homepage">
          <HomePage />
        </Route>
        <Route path="/profile/:id">
          <Profile />
        </Route>
        {/* Additional routes in case */}
        {/* 
          <Route path="/"></Route>
          <Route path="/"></Route>
          <Route path="/"></Route> */}
      </Router>
    </>
  );
}

export default App;
