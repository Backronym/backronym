import React, { Component } from 'react';

class Frequency extends Component {
    constructor() {
        super();
        this.state = {
            frequencyAverage: 0
        }
    }
    componentDidMount() {
        const frequencyAverage = arr => this.props.frequency.reduce((a, b) => a + b, 0) / this.props.frequency.length;
        this.setState({frequencyAverage});
    }
    render() {
        return(
            <h3>{this.state.frequencyAverage}</h3>
        )
    }
}

export default Frequency;