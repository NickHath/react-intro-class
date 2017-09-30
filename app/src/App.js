import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calculator from './components/Calculator'

class App extends Component {
/* this tag is a placeholder for the Calculator we import from ./components/Calculator' */
  render() {

    return (
      <div className="App">
        <Calculator />
      </div>
    );
  }
}

export default App;
