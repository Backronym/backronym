import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="gridParent">
                <div className="login">
                    <div className="controlsGap">
                        <h1>BACKRONYM</h1>
                        <button className="authButton secondarySButton" onClick={this.props.logIn}>Log In</button>
                        <button className="authButton lightButton">Guest</button>
                    </div>
                </div>
                <div className="hero">

                </div>

            </div>
        )
    }
}

export default Login;