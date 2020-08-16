import React, { Component } from "react";
import Word from "./Word";
import Frequency from './Frequency';
import axios from "axios";
import firebase from "./firebase";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      inputCharacters: [], //input string spread out
      inputIndex: 0,
      apiWords: [],
      backronym: [],
      backronymIndex: -1, //index of last accepted word in the backronym array
      frequency: [],
      rejectCounter: 0, //index to loop through API call result array
      isGenerated: false,
    };
  }
  //////////////////////////////////////////////
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //FUNCTIONS
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //////////////////////////////////////////////

  //the first API call
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
        md: 'f',
      },
    }).then((firstAPICallResult) => {
      const apiWords = firstAPICallResult.data;
      if (apiWords.length > 0) {
        this.setState({ apiWords, isGenerated: true });
      } else {
        axios({
          url: "https://api.datamuse.com/words?",
          method: "GET",
          responseType: "json",
          params: {
            sp: `${letter}*`,
            md: 'f',
          },
        }).then((secondAPICallResult) => {
          const apiWords = secondAPICallResult.data;
          if (apiWords.length > 0) {
            this.setState({ apiWords, isGenerated: true });
          }
        });
      }
    });
  };

  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  accept = () => {
    const copyBackronym = this.state.backronym; //array of accepted words
    copyBackronym.push(this.state.apiWords[this.state.rejectCounter].word);
    const copyFrequency = this.state.frequency;
    const wordFrequency = this.state.apiWords[this.state.rejectCounter].tags[0];
    const frequencyNum = parseFloat(wordFrequency.substring(2));
    copyFrequency.push(frequencyNum);

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
        if (this.state.apiWords.length < 4) {
        }
      } //making the API call only after state is set
    );
  };

  reject = () => {
    if (this.state.rejectCounter === this.state.apiWords.length - 1) {
      this.setState({ rejectCounter: 0 });
    } else {
      this.setState({ rejectCounter: this.state.rejectCounter + 1 }); //loop to the next word in the array
    }
  };

  handleRedo = () => {
    this.setState(
      {
        inputIndex: 0,
        backronym: [],
        backronymIndex: -1,
        rejectCounter: 0,
      },
      () => {
        this.apiCall(this.state.inputCharacters[this.state.inputIndex]);
      }
    );
  };

  handleSave = () => {
    const dbRef = firebase.database().ref();
    const backronymObject = {
      word: this.state.inputCharacters.join(""),
      backronym: this.state.backronym.join(" "),
    };
    dbRef.push(backronymObject);
  };

//   componentDidMount() {
//       const backronymFrequency = arr => this.state.frequency.reduce((a, b) => a + b, 0) / this.state.frequency.length;
//       this.setState({backronymFrequency});
//   }

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
            <h1>Backronym</h1>
            <form action="submit" onSubmit={(e) => this.apiCharacters(e)}>
              <label htmlFor="input">Enter a word</label>
              <input
                placeholder="eg: bird"
                type="text"
                value={this.state.input}
                pattern="^[A-Za-z]{3,10}$"
                title="our message here"
                required
                id="input"
                onChange={this.handleChange}
              ></input>
              <button className="generate lightButton">Generate</button>
            </form>
            <button
              className="secondaryControlButtons primeButton"
              onClick={() => this.handleRedo()}
            >
              Redo
            </button>
            <button
              className="secondaryControlButtons secondarySButton"
              onClick={() => this.handleSave()}
            >
              Save
            </button>
          </div>
        </div>
        <div className="results">
<<<<<<< HEAD
            <div className="resultsGap">
                {
                !this.state.isGenerated
                ? null
                : this.state.backronym.length < this.state.inputCharacters.length
                    ?<Word
                        word={this.state.apiWords[this.state.rejectCounter].word}
                        accept={this.accept}
                        reject={this.reject}
                    />
                    : <Frequency frequency={this.state.frequency}/>
                }
                    <ul className="words">
                        {
                            this.state.backronym.map( (word) => {
                                return <li>{word}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
=======
          <div className="resultsGap">
            {!this.state.isGenerated ? null : this.state.backronym.length <
              this.state.inputCharacters.length ? (
              <Word
                word={this.state.apiWords[this.state.rejectCounter].word}
                accept={this.accept}
                reject={this.reject}
              />
            ) : null}
            <ul className="words">
              {this.state.backronym.map((word) => {
                return <li>{word}</li>;
              })}
            </ul>
          </div>
        </div>
>>>>>>> master
      </div>
    );
  }
}

export default Search;