import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBlrAYdUGkn9R7ceA43kPr4yPwWOnbpUl8",
  authDomain: "reactjs-image.firebaseapp.com",
  databaseURL: "https://reactjs-image.firebaseio.com",
  projectId: "reactjs-image",
  storageBucket: "reactjs-image.appspot.com",
  messagingSenderId: "666868160157",
  appId: "1:666868160157:web:62010947d28d56542fa674",
  measurementId: "G-MBJZH9M4JJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const storage = firebase.storage();

export { storage, firebase as default };
