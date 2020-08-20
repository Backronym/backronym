import React, { Component } from "react";
import firebase from "./firebase";

class DisplayB extends Component {
  constructor() {
    super();
    this.state = {
      database: [],//return of the firebase public backronym list
    };
  }

  // connect to public side of the database to pull all backronyms made by anyone as soon as they are finished, not waiting for save button
  componentDidMount() {
    const dbRef = firebase.database().ref("displayBoard");
    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const update = [];
      for (let key in data) {
        update.push({ key: key, data: data[key] });
      }
      this.setState({
        database: update,
      });
    });
  }

  //using the firebase unique key serial, deleting a child of the display board object in the database to remove a backronym on button click
  remove = (dbKey) => {
    const dbRefToRead = firebase.database().ref("displayBoard");
    dbRefToRead.child(dbKey).remove();
  };

  render() {
    return (
      <div className="display">
        <div className="displayGap">
          <ul>
            {this.state.database.map((i) => {
              return (//mapping entire database object onto the display board component
                /// to be displayed in reverse so most recent is at the top. p tag will anchor the component, with a scroll function 
                /// the list will always remain at the top for a live feed feel. 
                <li key={i.key}>
                  <button onClick={() => this.remove(i.key)}>
                    <span>&times;</span>
                  </button>
                  <h6>{`${i.data.word}:`}</h6>
                  <p>{i.data.backronym}</p>
                </li>
              );
            })}
            <p id="display"></p>
          </ul>
        </div>
      </div>
    );
  }
}

export default DisplayB;
