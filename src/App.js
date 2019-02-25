import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Route } from 'react-router-dom';
import Strapi from './components/Strapi';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Strapi} />
      </div>
    );
  }
}

export default App;
