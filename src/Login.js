import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backronyms from './assets/backronyms.jpg';
import { auth } from 'firebase';
import firebase from 'firebase';

class Login extends Component {
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
  
  //LOGIN FUNCTION
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
  
  render() {    
    return (
      <div className="gridParent">
        <div className="login">
          <h1>Auth</h1>
          { 
            this.state.user
            ? <button onClick={this.logout}>Log out</button>
            : <button onClick={this.login}>
                <Link className="lightButton" to="/backronym/generate">START</Link>
              </button>
          }
          
        </div>
        <div className="hero">

        </div>
      </div>
    )
  }
}

export default Login;