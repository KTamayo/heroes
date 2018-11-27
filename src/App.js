import React, { Component } from 'react';
import AppBar from './components/AppBar/AppBar';
import SearchResults from './components/SearchResults/SearchResults';

class App extends Component {

  render() {
    return (
      <div>
        <AppBar />
        <SearchResults />
      </div>
    );
  }
}

export default App;
