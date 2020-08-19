import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="gridParent">
                <div className="login">
                    <div className="controlsGap">
                        <h1>BACKRONYM</h1>
                        <button className="authButton secondarySButton" onClick={this.props.logIn}>Log In</button>
                        <button className="authButton lightButton" onClick={this.props.guest}>Guest</button>
                        <footer>
                            <p>Copyright &copy; 2020:</p>
                            <a target="_blank" href="https://meganrantz.io/">Megan</a>
                            <a target="_blank" href="http://debyucodes.com/">Deb</a>
                            <a target="_blank" href="http://twitter.com/alexorer">Ashwin</a>
                            <a target="_blank" href="https://rahatrahman.com/">Rahat</a>
                        </footer>
                    </div>
                </div>
                <div className="hero">

                </div>

            </div>
        )
    }
}

export default Login;