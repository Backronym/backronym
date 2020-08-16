import React, { Component } from 'react';

class Frequency extends Component {
    constructor() {
        super();
        this.state = {
            frequencyAverage: 0
        }
    }
    componentWillMount() {
        const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
        const freqAvg = arrAvg(this.props.frequency);
        this.setState({frequencyAverage: freqAvg});
    }
    render() {
        return(
            <div className="frequency">
                <span>This backronym frequency is:</span>
                <h3>{this.state.frequencyAverage}</h3>
            </div>
        )
    }
}

export default Frequency;