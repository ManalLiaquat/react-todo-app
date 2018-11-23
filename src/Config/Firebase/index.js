import * as firebase from "firebase";
var config = {
    apiKey: "AIzaSyBDVewcrkpK-wPLxyaMd14QcTfxOxTBwO4",
    authDomain: "mml-react-todo-app.firebaseapp.com",
    databaseURL: "https://mml-react-todo-app.firebaseio.com",
    projectId: "mml-react-todo-app",
    storageBucket: "mml-react-todo-app.appspot.com",
    messagingSenderId: "629427951652"
  };
firebase.initializeApp(config);
export default firebase;