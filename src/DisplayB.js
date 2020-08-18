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


    remove = (dbKey) => {
    const dbRefToRead = firebase.database().ref('displayBoard');
    dbRefToRead.child(dbKey).remove();
    }

    render(){
        return (
            <div className="display">
                <div className="displayGap">
                    <ul>
                        
                    {
                        this.state.database.map((i) => {
                        return <li key={i.key} >
                                    <button onClick={() => this.remove(i.key)}><span>&times;</span></button>
                                    <h6>{`${i.data.word}:`}</h6>
                                    <p>{i.data.backronym}</p>
                                </li>
                        })
                    }
                    <p id="display"></p>
                    </ul>
                </div>
            </div>      
        )
    }
}


export default DisplayB;