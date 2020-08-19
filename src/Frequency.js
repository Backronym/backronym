import React, { Component } from "react";

class Frequency extends Component {
  constructor() {
    super();
    this.state = {
      frequencyAverage: 0,
    };
  }
  //calculate the sum of the ngram frequencies and set the average
  componentDidMount() {
    const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    const freqAvg = Math.round(arrAvg(this.props.frequency));
    this.setState({ frequencyAverage: freqAvg });
  }
  render() {
    return (
      // display the ngram frequency
      <div className="frequency">
        <h5>This backronym frequency is:</h5>
        <p>
          <span>{this.state.frequencyAverage}</span> (occurrences per million
          words in English text)
        </p>
      </div>
    );
  }
}

export default Frequency;
