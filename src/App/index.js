import React, { Component } from 'react';
import Todo from "../Screens/Todo";
import SignUp from "../Screens/SignUp";
import SignIn from "../Screens/SignIn";
import Logout from "../Components/Logout";
import { connect } from "react-redux";
import { updateUser } from "../Config/Redux/Actions/authActions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  static getDerivedStateFromProps(props) {
    console.log('IsUser_REDUX ==>', props.user ? "YES" : "NO");
    return { user: props.user }
  }

  render() {
    let { user } = this.state
    return (
      <div >
        {
          user ? (
            <div>
              <Logout />
              <br />
              <Todo />
            </div>
          ) : (
              <div>
                <SignUp />
                <SignIn />
              </div>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("state from component", state);
  return {
    user: state.authReducers.user
  };
};

const mapDispatchToProps = dispatch => {
  // console.log("dispatch from component", dispatch);
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
