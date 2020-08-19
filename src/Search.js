import React, { Component } from "react";
import Word from "./Word";
import Frequency from "./Frequency";
import DisplayB from "./DisplayB";
import UserCollection from "./UserCollection";
import axios from "axios";
import firebase from "./firebase";
import Loader from "./Loader";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "", //user input, initially set to an empty string
      inputCharacters: [], //input string spread out
      inputIndex: 0, //tracking the index of inputCharacters
      apiWords: [], //words that are returned from the API
      backronym: [], //an array of user accepted words
      backronymIndex: -1, //index of last accepted word in the backronym array
      frequency: [], //ngram frequency of each word in the backronym array
      displayArray: [],
      rejectCounter: 0, //index to loop through API call result array
      loading: false,
      isGenerated: false, //API results flag
    };
  }
  //////////////////////////////////////////////
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //FUNCTIONS
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //////////////////////////////////////////////

  //randomizing the returned apiWords array using the Fisher–Yates shuffle algorithm
  randomizeArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  //the first API call and resetting states
  apiCharacters = (e) => {
    e.preventDefault();
    this.setState(
      {
        inputCharacters: [...this.state.input],
        input: "",
        inputIndex: 0,
        backronym: [],
        backronymIndex: -1,
        rejectCounter: 0,
        loading: true,
        frequency: [],
      },
      () => {
        this.apiCall(this.state.inputCharacters[0]);
      }
    );
  };

  //This function can call the API upto two times:
  // - the first time passing a "starting letter" as well as a word
  //- the second time passing just a "starting letter"
  // - if the first api call returns no "related words" in the results, we make the second API call
  apiCall = (letter, word) => {
    axios({
      url: "https://api.datamuse.com/words?",
      method: "GET",
      responseType: "json",
      params: {
        sp: `${letter}*`,
        lc: word,
        md: "f",
      },
    }).then((firstAPICallResult) => {
      const apiWords = firstAPICallResult.data;
      if (apiWords.length > 4) {
        this.randomizeArray(apiWords);
        this.setState({ apiWords, isGenerated: true, loading: false });
      } else {
        axios({
          url: "https://api.datamuse.com/words?",
          method: "GET",
          responseType: "json",
          params: {
            sp: `${letter}*`,
            md: "f",
          },
        }).then((secondAPICallResult) => {
          const apiWords = secondAPICallResult.data;
          if (apiWords.length > 4) {
            this.randomizeArray(apiWords);
            this.setState({ apiWords, isGenerated: true, loading: false });
          }
        });
      }
    });
  };

  //saving the user input value
  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  //function to handle when user accepts a word for the backronym
  accept = () => {
    //pushing the user selected word to a copy of the backronym array
    const copyBackronym = this.state.backronym; //array of accepted words
    copyBackronym.push(this.state.apiWords[this.state.rejectCounter].word);
    //parsing the ngram frequecny value from string to a float in order to do calculations
    const copyFrequency = this.state.frequency;
    const wordFrequency = this.state.apiWords[this.state.rejectCounter].tags[0];
    const frequencyNum = parseFloat(wordFrequency.substring(2));
    copyFrequency.push(frequencyNum);

    //updating state and making an API call with the next input letter and the saved backronym word
    this.setState(
      {
        backronym: copyBackronym,
        frequency: copyFrequency,
        rejectCounter: 0,
        backronymIndex: this.state.backronymIndex + 1,
        inputIndex: this.state.inputIndex + 1,
      },
      () => {
        this.apiCall(
          this.state.inputCharacters[this.state.inputIndex], //"r","u"
          this.state.backronym[this.state.backronymIndex] //to,rush
        );
        if (this.state.backronym.length === this.state.inputCharacters.length) {
          const dbRef = firebase.database().ref("displayBoard");
          const backronymObject = {
            word: this.state.inputCharacters.join(""),
            backronym: this.state.backronym.join(" "),
          };
          dbRef.push(backronymObject);
          const display = document.getElementById("display");
          display.scrollIntoView({ behavior: "smooth" });
        }
      } //making the API call only after state is set
    );
  };

  //function to handle when the user rejects a word for the backronym
  reject = () => {
    if (this.state.rejectCounter === this.state.apiWords.length - 1) {
      this.setState({ rejectCounter: 0 });
    } else {
      this.setState({ rejectCounter: this.state.rejectCounter + 1 }); //loop to the next word in the array
    }
  };

  //making an API call with the first of the same input letter if the user chooses to redo the backronym
  handleRedo = () => {
    this.setState(
      {
        inputIndex: 0,
        backronym: [],
        backronymIndex: -1,
        rejectCounter: 0,
        frequency: [],
        displayOrCollection: true,
      },
      () => {
        this.apiCall(this.state.inputCharacters[this.state.inputIndex]);
      }
    );
  };

  //saving the backronyms to firebase on Save for the usersCollection
  handleSave = () => {
    const dbRef = firebase.database().ref("userCollection");
    const backronymObject = {
      word: this.state.inputCharacters.join(""),
      backronym: this.state.backronym.join(" "),
      //associating saved backronym with the logged in user's email
      email: this.props.userEmail,
    };
    console.log("before saving");
    console.log(backronymObject);
    dbRef.push(backronymObject);
  };

  displayOrCollection = () => {
    const reverseOfDisplayOrCollection = !this.state.displayOrCollection;
    this.setState({
      displayOrCollection: reverseOfDisplayOrCollection,
    });
  };

  //////////////////////////////////////////////
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //RENDER
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //////////////////////////////////////////////
  render() {
    return (
      <div className="search gridParent">
        <div className="controls">
          <div className="controlsGap">
            <button
              className="authButton primeButton"
              onClick={this.props.logOut}
            >
              Log Out
            </button>
            <h3>Backronym</h3>
            {/* user input form */}
            <form action="submit" onSubmit={(e) => this.apiCharacters(e)}>
              <label htmlFor="input">Enter a word</label>
              <input
                placeholder="eg: bird"
                type="text"
                value={this.state.input}
                pattern="^[A-Za-z]{3,10}$"
                title="Enter a word between 3 and 10 characters in length"
                required
                id="input"
                onChange={this.handleChange}
              ></input>
              <button type="submit" className="generate lightButton">
                Generate
              </button>
            </form>
            {/* buttons to redo and save */}
            <button
              className="secondaryControlButtons primeButton"
              onClick={() => this.handleRedo()}
            >
              Redo
            </button>
            <button
              disabled={
                this.state.backronym.length < this.state.inputCharacters.length
              }
              className="secondaryControlButtons secondarySButton"
              onClick={() => this.handleSave()}
            >
              Save
            </button>
          </div>
        </div>
        {/* Displaying the results */}
        <div className="results">
          {/* show words from the API results until the user accepts backronyms for all letters and then pass the ngram frequencies as props to the Frequency component */}
          <div className="resultsGap">
            {!this.state.isGenerated ? null : this.state.backronym.length <
              this.state.inputCharacters.length ? (
              <Word
                word={this.state.apiWords[this.state.rejectCounter].word}
                accept={this.accept}
                reject={this.reject}
              />
            ) : (
              <Frequency frequency={this.state.frequency} />
            )}

            {this.state.loading ? (
              <Loader />
            ) : (
              <ul className="words">
                {
                  //  display the user accepted backronym word
                  this.state.backronym.map((word, index) => {
                    return <li key={index}>{word}</li>;
                  })
                }
              </ul>
            )}
            <div className="collectionButtons">
              {!this.state.displayOrCollection ? (
                <button
                  className="collection primeButton"
                  onClick={() => this.displayOrCollection()}
                >
                  Your Collection
                </button>
              ) : (
                <button
                  className="collection secondarySButton"
                  onClick={() => this.displayOrCollection()}
                >
                  Recent
                </button>
              )}
            </div>
          </div>
          {!this.state.displayOrCollection ? (
            <DisplayB />
          ) : (
            <UserCollection userEmail={this.props.userEmail} />
          )}
        </div>
      </div>
    );
  }
}

export default Search;
