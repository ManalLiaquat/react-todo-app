import React, { Component } from 'react';
import Todo from "../Screens/Todo";
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  render() {
    return (
      <div >
        <Todo />
      </div>
    );
  }
}

export default App;
