import React from 'react';

const Word = (props) => {
    return (
        <div className="word">
             <div>
                <button className="chooseWord primeButton" onClick={props.reject}>Reject</button>
                <button className="chooseWord secondarySButton" onClick={props.accept}>Accept</button>
            </div>
            <div>
                <h2>{props.word}</h2>
            </div>
        </div>
    );
}

export default Word;