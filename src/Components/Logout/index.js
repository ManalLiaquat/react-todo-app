import React, { Component } from 'react';
import firebase from "../../Config/Firebase";
import { connect } from "react-redux";
import { removeUser } from "../../Config/Redux/Actions/authActions";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.logout = this.logout.bind(this)
  }

  logout() {
    firebase.auth().signOut().then(() => {
      console.log("Logged out");
      this.props.removeUser()
    })
  }


  render() {
    return (
      <div>
        <button onClick={this.logout}>Logout</button>
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
    removeUser: () => dispatch(removeUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
