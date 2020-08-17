import React, {Component} from 'react';
import firebase from "./firebase";

class DisplayB extends Component {
    constructor(){
        super();
        this.state = {
            database: []
        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref('displayBoard');
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

    render(){
        return (
            <div className="display">
                <div className="displayGap">
                    {
                        this.state.database.map((i) => {
                        return <li><h6>{`${i.data.word}:`}</h6><p>{i.data.backronym}</p></li>
                        })
                    }
                </div>
            </div>
        )
    }
}


export default DisplayB;