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
                        <button className="howButton" onClick={this.props.howToggle}>How To Use</button>
                        <button className="what">What is a Backronym?</button>
                        <footer>
                            <p>Copyright &copy; 2020:</p>
                            <a href="https://meganrantz.io/">Megan</a>
                            <a href="http://debyucodes.com/">Deb</a>
                            <a href="http://twitter.com/alexorer">Ashwin</a>
                            <a href="https://rahatrahman.com/">Rahat</a>
                        </footer>
                    </div>
                </div>
                <div className="hero">


                    {
                        this.props.show
                            ? false
                            : <div className="howToggle">Welcome to the Backronym Generator. Log in to start generating your unique backronyms by typing in an <span>input word</span> of your choice. Accept or reject the randomized word generated for the first letter of your word. Reject for another randomized word to be generated. Once youve accepted the first word for the first letter. Another word will be generated for the second letter of your <span>input word</span> based on the meaning of the first word you chose.</div>
                    }
                </div>
            </div>
        )
    }
}

export default Login;