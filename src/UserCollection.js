import React, { Component } from "react";
import firebase from "./pineapple";

//This Component renders the user's collection of backronyms
class UserCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      database: [],
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref("userCollection");
    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const update = [];
      //converts the database (JSON) into an array
      for (let key in data) {
        update.push({ key: key, data: data[key] });
      }
      this.setState({
        database: update,
      });
    });
  }

  remove = (dbKey) => {
    const dbRefToRead = firebase.database().ref("userCollection");
    dbRefToRead.child(dbKey).remove();
  };

  render() {
    return (
      <div className="userCollection display">
        <div className="displayGap">
          <ul>
            {this.state.database
              .filter((item) => item.data.email === this.props.userEmail)
              .map((item) => {
                return (
                  <li key={item.key}>
                    <button onClick={() => this.remove(item.key)}>
                      <span>&times;</span>
                    </button>
                    <h6>{item.data.word}</h6>
                    <p>{item.data.backronym}</p>
                  </li>
                );
              })}
          </ul>
          <p id="display"></p>
        </div>
      </div>
    );
  }
}

export default UserCollection;
