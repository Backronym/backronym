import React, { Component } from 'react';
import Search from './Search';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { render } from '@testing-library/react';

class App extends Component {
  render() {
      return (
        <Router>
          <div className="App">
            <h1>Test 2</h1>
          </div>
          <Search />
      </Router>
    );
  }
}
  

export default App;
