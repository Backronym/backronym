import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="gridParent">
        <div className="login">
          <div className="controlsGap">
            <h1>BACKRONYM</h1>
            <button
              className="authButton secondarySButton"
              onClick={this.props.logIn}
            >
              Log In
            </button>
            <button
              className="authButton lightButton"
              onClick={this.props.guest}
            >
              Guest
            </button>
            <button
              className="instructionButton"
              onClick={this.props.howToggle}
            >
              How To Use
            </button>
            <button
              className="instructionButton"
              onClick={this.props.whatToggle}
            >
              What is a Backronym?
            </button>
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
          {this.props.show ? (
            false
          ) : (
            <div className="overlay howOverlay">
              <h2>How to use</h2>
              <div>
                Welcome to the Backronym Generator. Log in to start generating
                your unique backronyms by typing in an <span>input word</span>{" "}
                of your choice. Accept or reject the randomized word generated
                for the first letter of your word. Reject for another randomized
                word to be generated. Once you have accepted the first word for
                the first letter, another word will be generated for the second
                letter of your <span>input word</span> based on the meaning of
                the first word you chose.
              </div>
            </div>
          )}
          {this.props.showWhat ? (
            false
          ) : (
            <div className="overlay whatOverlay">
              <h2>What is a backronym?</h2>
              <div>
                A backronym is an existing word turned into an acronym by
                creating an apt phrase whose initial letters match with the
                word, as to help remember it or offer a theory of its origin.
                For example: our backronym for <span>JUNO</span> is{" "}
                <span>J</span>oint <span>U</span>p <span>N</span>atural{" "}
                <span>O</span>ne.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
