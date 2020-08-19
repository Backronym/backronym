import React, { Component } from "react";
import Search from "./Search";
import Login from "./Login";
import "./App.css";
import { render } from "@testing-library/react";
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
    super ();
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    const auth = firebase.auth();
    
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }
  
  // LOGIN FUNCTION
  login = () => {  
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    
    auth.signInWithPopup(provider).then((result) =>{
      const user = result.user;
      this.setState({ user })
    })
  }
  
  // LOGOUT FUNCTION
  logout = () => {
    const auth = firebase.auth();
    
    auth.signOut().then(() => {
      this.setState({
        user: null
      })
    })
  }

  // GUEST FUNCTION
  guest = () => {
    const auth = firebase.auth();

    auth.signInAnonymously().then((result) => {
      console.log('logged in as guest');

      const user = result.user
      this.setState({
        user: user,
      })
    })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessahe = error.message;
    //   console.log(errorCode);
    //   console.log(errorMessage);
    // })
  }
  
  

  render() {
    return (
          <div className="app">
              { 
                this.state.user
                ? <Search logOut={this.logout}/>
                : <Login logIn={this.login}/>
              }
              <button onClick={this.state.guest}>hello?</button>
          </div>
    );
  }
}

export default App;
