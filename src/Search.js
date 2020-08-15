import React, { Component } from 'react';
import Word from './Word';
import axios from 'axios';

class Search extends Component {
  constructor() {
      super();
      this.state = {
          input: '',
          inputCharacters: [],
          apiWords: [],
          backronym: [],
          counter: 0,
          isGenerated: false
      }
  }

  apiCharacters = (e) => {
      e.preventDefault();
      this.setState({
          inputCharacters: [...this.state.input]
      }, () => {
          this.apiCall(this.state.inputCharacters[0]);
      });
  }

    handleLike = () => {
        const newCounter = this.state.counter + 1;
        this.setState({
            counter: newCounter,
            dog: this.state.results[this.state.counter].url,
        })
    }



  apiCall = (letter, word) => {
    axios({
      url: 'https://api.datamuse.com/words?',
      method: 'GET',
      responseType: 'json',
      params: {
        sp: `${letter}*`,
        lc: word,
      },
    }).then((res)=>{
      const apiWords = res.data
      this.setState({ apiWords, isGenerated: true })
    })
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  };

  accept = () => {
      const copyBackronym = this.state.backronym;
      copyBackronym.push(this.state.apiWords[this.state.counter].word);
      this.setState({
          backronym: copyBackronym
      })
  }

  reject = () => {
      this.setState({ counter: this.state.counter + 1 });
  }

  render() {
    return(
      <div className="search">

        <form
        action="submit"
        onSubmit={(e) => this.apiCharacters(e)}>

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
        {this.state.isGenerated 
        ? <Word word={this.state.apiWords[this.state.counter].word} accept={this.accept} reject={this.reject}/>
        : null
        }
      </div>

    )
  }
}

export default Search;