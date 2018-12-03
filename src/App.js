import React, { Component, Fragment } from 'react';

import AppBar from './components/AppBar/AppBar';
import SearchResults from './components/SearchResults/SearchResults';

import Route from 'react-router-dom/Route';


class App extends Component {

  render() {
    return (
      <Fragment>
        <AppBar />        
        <Route exact path='/' component={SearchResults} />        
      </Fragment>      
    );
  }
}

export default App;
 