import React from 'react';

const Word = (props) => {
  return (
    //button to trigger the accept and reject functions passed as prop on click
    <div className="word">
      <div>
          <button className="chooseWord primeButton" disabled={props.pause} onClick={props.reject}>Reject</button>
          <button className="chooseWord secondarySButton" disabled={props.pause} onClick={props.accept}>Accept</button>
      </div>
      {/* display the suggested word */}
      <div>
          <h2>{props.word}</h2> 
      </div>
    </div>
  );
}

export default Word;