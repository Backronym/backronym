import React from 'react';

const Word = (props) => {
    return (
        <div>
            <h2>{props.word}</h2>
            <button onClick={props.accept}>Accept</button>
            <button onClick={props.reject}>Reject</button>
        </div>
    );
}

export default Word;