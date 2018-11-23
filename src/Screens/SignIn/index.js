import React, { Component } from 'react';
import firebase from "../../Config/Firebase";
import { connect } from "react-redux";
import { updateUser } from "../../Config/Redux/Actions/authActions";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: ''
    }
    this.SignIn = this.SignIn.bind(this)
  }

  static getDerivedStateFromProps(props) {
    return { user: props.user }
  }

  SignIn() {
    let { email, pass } = this.state
    firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
      console.log("Logged in");
    })
    this.props.updateUser()
  }


  render() {
    return (
      <div >
        <h3>Sign In</h3>
        <input type="text" placeholder="Email" onChange={e => { this.setState({ email: e.target.value }) }} />
        <input type="text" placeholder="Password" onChange={e => { this.setState({ pass: e.target.value }) }} />
        <button onClick={this.SignIn}>Sign In</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

