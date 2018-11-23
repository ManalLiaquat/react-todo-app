import React, { Component } from 'react';
import firebase from "../../Config/Firebase";

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
        <h3>Sign Up</h3>
        <input type="text" placeholder="Email" onChange={e => { this.setState({ email: e.target.value }) }} />
        <input type="text" placeholder="Password" onChange={e => { this.setState({ pass: e.target.value }) }} />
        <button onClick={this.signUp}>Sign Up</button>
      </div>
    );
  }
}

export default SignUp;
