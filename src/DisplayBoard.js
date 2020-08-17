import React, { Component } from "react";
import firebase from "./firebase";

class DisplayBoard extends Component {
  constructor() {
    super();
    this.state = {
      database: [],
    };
  }
  //get the saved backronyms from firebase whenever there is a change and update state
  componentDidMount() {
    const dbRef = firebase.database().ref();
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
    render () {
        //display the saved word and backronym
        return(
            <div className="gridParent">
                <div className="displayBoard">
                    <ul>
                        {
                            this.state.database.map((item, index) => {
                                return <li key={index}>
                                    <span>{item.data.word}</span>
                                    <p>{item.data.backronym}</p>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }

}

export default DisplayBoard;
