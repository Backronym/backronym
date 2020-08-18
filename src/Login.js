import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backronyms from './assets/backronyms.jpg';
import { auth } from 'firebase';
import authentication from './authentication';

class Login extends Component {
  constructor() {
    super ();
    this.state = {
      user: null
    }
  }

  //LOGIN FUNCTION
  login = () => {
    auth.signInWithPopup(provider).then((result) =>{
      const user = result.user;
      this.setState({ user })
    })
  }

  // LOGOUT FUNCTION
  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      })
    })
  }
  
  render() {
    const provider = new authentication.auth.GoogleAuthProvider();
    const auth = authentication.auth();

    return (
      <div class="gridParent">
        <div className="login">
          <h1>Auth</h1>
          { 
            this.state.user
            ? <button onClick={this.logout}>Log out</button>
            : <button onclick={this.login}>Log in</button>
          }
          <Link className="lightButton" to="/backronym">START</Link>
        </div>
        <div className="hero">

        </div>
      </div>
    )
  }
}

export default Login;