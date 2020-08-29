import React, { Component } from "react";
import Search from "./Search";
import Login from "./Login";
import "./App.css";
import firebase from "./firebase";

// Make an input and submit button on "search" component
//- store input value in state
//- turn input value into array of characters using spread operator
//- set min character count = 4, max = 10, no space, no special characters

//sub Component
//- on submit, call API for the first letter
//- when the user keeps the first word, we make another API call for the second letter based on the first word they choose
//- make as many calls as letters in the input, save each word to an array
//- .map API return on page

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      email: null, 
      show: true, // instructions toggle 1
      showWhat: true, // instructions toggle 2
    };
  }

  // Keep user logged in to Google authentication
  componentDidMount() {
    const auth = firebase.auth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        const userEmail = user.email ? user.email : "anon@anon.com";
        this.setState({ user, email: userEmail });
      }
    });
  }

  //LOGIN FUNCTION - Login of google authentication from firebase
  login = () => {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({ user, email: user.email });
    });
  };

  // LOGOUT FUNCTION - logout of google authentication from firebase
  logout = () => {
    const auth = firebase.auth();

    auth.signOut().then(() => {
      this.setState({
        user: null,
      });
    });
  };

  // GUEST FUNCTION - be able to use the app without a google account
  guest = () => {
    const auth = firebase.auth();

    auth.signInAnonymously().catch(() => {
      this.setState({
        email: `anon@anon.com`,
      });
    });
  };

  // INSTRUCTION -- toggle showing the instructions by updating boolean in state
  howToggle = () => {
    const copyOfShow = !this.state.show;

    this.setState({
      show: copyOfShow,
    });
  };

  // INSTRUCTION -- toggle showing the instructions by updating boolean in state
  whatToggle = () => {
    const copyOfShowWhat = !this.state.showWhat;

    this.setState({
      showWhat: copyOfShowWhat,
    });
  };

  //Render either the search for the login in screen depending on user login status
  render() {
    return (
      <div className="app">
        {this.state.user ? (
          <Search logOut={this.logout} userEmail={this.state.email} />
        ) : (
          <Login
            logIn={this.login}
            guest={this.guest}
            howToggle={this.howToggle}
            show={this.state.show}
            whatToggle={this.whatToggle}
            showWhat={this.state.showWhat}
          />
        )}
      </div>
    );
  }
}

export default App;