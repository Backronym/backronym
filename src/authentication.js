import firebase from 'firebase';

// Your web app's Firebase configuration
const authentication = {
  apiKey: "AIzaSyDf3yfdKF3oBKvAG_rLsyT2d7MycaVsucw",
  authDomain: "backronym-authentication.firebaseapp.com",
  databaseURL: "https://backronym-authentication.firebaseio.com",
  projectId: "backronym-authentication",
  storageBucket: "backronym-authentication.appspot.com",
  messagingSenderId: "25503685013",
  appId: "1:25503685013:web:01bb9c9e35d77c5759fe9c",
  measurementId: "G-6W6C973D6E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default authentication;

