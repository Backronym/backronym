import React from 'react';
const Login = (props) => {

    return (
        <div className="gridParent">
            <div className="login">
                <div className="controlsGap">
                    <h1>BACKRONYM</h1>
                    <button className="authButton secondarySButton" onClick={props.logIn}>Log In</button>
                    <button className="authButton lightButton" onClick={props.guest}>Guest</button>
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
            </div>

        </div>
    )
}

export default Login;