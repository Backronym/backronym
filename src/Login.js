import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backronyms from './assets/backronyms.jpg';

class Login extends Component {
    render() {
        return (
            <div class="gridParent">
                <div className="login">
                    <Link className="lightButton" to="/backronym">START</Link>
                </div>
                <div className="hero">

                </div>
            </div>
        )
    }
}

export default Login;