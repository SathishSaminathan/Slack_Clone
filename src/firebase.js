import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCRP5ZRze9BCOjO9upJdmQvyD2PNOZk_8Y",
  authDomain: "react-slack-clone-aae87.firebaseapp.com",
  databaseURL: "https://react-slack-clone-aae87.firebaseio.com",
  projectId: "react-slack-clone-aae87",
  storageBucket: "react-slack-clone-aae87.appspot.com",
  messagingSenderId: "305321254542"
};
firebase.initializeApp(config);

export default firebase;
