import React, { Component } from 'react';

class Frequency extends Component {
    constructor() {
        super();
        this.state = {
            frequencyAverage: 0
        }
    }
    //calculate the sum of the ngram frequencies and set the average
    componentDidMount() {
        const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
        const freqAvg = arrAvg(this.props.frequency);
        this.setState({frequencyAverage: freqAvg});
    }
    render() {
        return(
            // display the ngram frequency
            <div className="frequency">
                <span>This backronym frequency is:</span>
                <h3>{this.state.frequencyAverage}</h3>
            </div>
        )
    }
}

export default Frequency;