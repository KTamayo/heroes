import React, { Component } from 'react';
import AppBar from './components/AppBar/AppBar';
import SearchResults from './components/SearchResults/SearchResults';

import './App.css';
// import logo from './logo.svg';

class App extends Component {
  
  render() {
    return (
      <div>
        <AppBar />
        <SearchResults />    
        {/* <img src={logo} alt='logo' className='App-logo' />*/}
      </div>
    );
  }
}

export default App;