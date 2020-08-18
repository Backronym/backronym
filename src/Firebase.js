import firebase, { app } from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD09HbLD6nsxKX0n6NKDf8NyZru7CTrxng",
  authDomain: "backronym-generator.firebaseapp.com",
  databaseURL: "https://backronym-generator.firebaseio.com",
  projectId: "backronym-generator",
  storageBucket: "backronym-generator.appspot.com",
  messagingSenderId: "125883152942",
  appId: "1:125883152942:web:d2dd801b6d1586c4d43dbf"
};

// class Firebase {
//   constructor() {
//     app.initializeApp(firebaseConfig);

//     this.auth = app.auth();
//   }
// }

// initialize firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
