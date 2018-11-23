import React, { Component } from 'react';
import firebase from "../../Config/Firebase";
import { connect } from "react-redux";
import { removeUser } from "../../Config/Redux/Actions/authActions";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  btn: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
})

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
    const { classes } = this.props
    return (
      <div>
        <Button variant="contained" color="secondary" size="large" className={classes.btn} onClick={this.logout}>Logout</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Logout));
