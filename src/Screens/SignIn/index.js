import React, { Component } from 'react';
import firebase from "../../Config/Firebase";
import { connect } from "react-redux";
import { updateUser } from "../../Config/Redux/Actions/authActions";
import { TextField, Button, Typography } from "@material-ui/core";

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
        <Typography variant="overline">Sign In</Typography>
        <TextField placeholder="Email" onChange={e => { this.setState({ email: e.target.value }) }} />
        <TextField placeholder="Password" onChange={e => { this.setState({ pass: e.target.value }) }} />
        <Button variant="contained" color="primary" onClick={this.SignIn}>Sign In</Button>
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

