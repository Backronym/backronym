import React, { Component } from "react";
import firebase from "./firebase";

//This Component renders the user's collection of backronyms
class userCollection extends Component {
  constructor() {
    super();
    this.state = {
      database: [],
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref("userCollection");
    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const update = [];
      //convers the database (JSON) into an array
      for (let key in data) {
        update.push({ key: key, data: data[key] });
      }
      this.setState({
        database: update,
      });
    });
  }

  render() {
    return (
      <div className="gridParent">
        <div className="userCollection">
          <ul>
            {this.state.database.map((item) => {
              return (
                <li>
                  <span>{item.data.word}</span>
                  <p>{item.data.backronym}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default userCollection;
