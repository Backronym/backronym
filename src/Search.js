import React, { Component } from "react";
import Word from "./Word";
import axios from "axios";

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
      rejectCounter: 0, //index to loop through API call result array
      isGenerated: false,
    };
  }

  //the first API call
  apiCharacters = (e) => {
    e.preventDefault();
    this.setState(
      {
        inputCharacters: [...this.state.input],
      },
      () => {
        this.apiCall(this.state.inputCharacters[0]);
      }
    );
  };

  apiCall = (letter, word) => {
    axios({
      url: "https://api.datamuse.com/words?",
      method: "GET",
      responseType: "json",
      params: {
        sp: `${letter}*`,
        lc: word,
      },
    }).then((res) => {
      const apiWords = res.data;
      this.setState({ apiWords, isGenerated: true });
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

    this.setState(
      {
        backronym: copyBackronym,
        rejectCounter: 0,
        backronymIndex: this.state.backronymIndex + 1,
        inputIndex: this.state.inputIndex + 1,
      },
      () => {
        this.apiCall(
          this.state.inputCharacters[this.state.inputIndex], //"r","u"
          this.state.backronym[this.state.backronymIndex] //to,rush
        );
        console.log(this.state.apiWords);
        console.log(this.state.apiWords.length);

        if (this.state.apiWords.length < 4) {
          console.log("very few words");
          //this.apiCall(this.state.inputCharacters[this.state.inputIndex]); //to,rush
          this.cool(); //to,rush
          console.log("api words array");
          console.log(this.state.apiWords);
        }
      } //making the API call only after state is set

      );
    };

    cool = function(){
      console.log('why isnt this working');
      this.apiCall('b');
    }

  reject = () => {
    this.setState({ rejectCounter: this.state.rejectCounter + 1 }); //loop to the next word in the array
  };

  render() {
    return (
      <div className="search">
        <form action="submit" onSubmit={(e) => this.apiCharacters(e)}>
          <label htmlFor="input">Enter a word</label>
          <input
            type="text"
            value={this.state.input}
            pattern="^[A-Za-z]{3,10}$"
            required
            id="input"
            onChange={this.handleChange}
          ></input>
          <button>Generate</button>
        </form>
        {this.state.isGenerated ? (
          <Word
            word={this.state.apiWords[this.state.rejectCounter].word}
            accept={this.accept}
            reject={this.reject}
          />
        ) : null}
      </div>
    );
  }
}

export default Search;
