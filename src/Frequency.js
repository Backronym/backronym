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
                <h5>This backronym frequency is:</h5>
                <p><span>{this.state.frequencyAverage}</span> out of a Million</p>
            </div>
        )
    }
}

export default Frequency;