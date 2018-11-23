import React, { Component } from 'react';
import firebase from "../../Config/Firebase";
import { TextField, Button, Typography } from "@material-ui/core";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: ''
    }
    this.signUp = this.signUp.bind(this)
  }

  signUp() {
    let { email, pass } = this.state
    firebase.auth().createUserWithEmailAndPassword(email, pass).then((result) => {
      const user = result.user.toJSON()
      var userObj = {
        email: user.email,
        uid: user.uid
      };
      firebase.database().ref('/').child(`users/${user.uid}`).set(userObj)
      console.log('Signed Up');

    })
  }


  render() {
    return (
      <div>
        <Typography variant="overline">Sign Up</Typography>
        <TextField placeholder="Email" onChange={e => { this.setState({ email: e.target.value }) }} />
        <TextField placeholder="Password" onChange={e => { this.setState({ pass: e.target.value }) }} />
        <Button variant="contained" color="secondary" onClick={this.signUp}>Sign Up</Button>
      </div>
    );
  }
}

export default SignUp;
