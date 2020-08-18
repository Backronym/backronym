import React, { Component } from "react";
import Search from "./Search";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import userCollection from "./UserCollection";
import Login from "./Login";

// Make an input and submit button on "search" component
//- store input value in state
//- turn input value into array of characters using spread operator
//- set min character count = 4, max = 10, no space, no special characters

//sub Component
//- on submit, call API for the first letter
//- when the user keeps the first word, we make another API call for the second letter based on the first word they choose
//- make as many calls as letters in the input, save each word to an array
//- .map API return on page

class app extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/backronym" component={Login} />
        <Route path="/backronym/generate" component={Search} />
      </Router>
    );
  }
}

export default app;
