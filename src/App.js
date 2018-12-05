import React, { Component, Fragment } from 'react';

import AppBar from './components/AppBar/AppBar';
import SearchResults from './components/SearchResults/SearchResults';
import HeroDetail from './components/HeroDetail/HeroDetail';

import Route from 'react-router-dom/Route';


class App extends Component {

  render() {
    return (
      <Fragment>
        <AppBar />
        <Route exact path='/' component={SearchResults} />
        <Route path='/hero_detail' component={HeroDetail} />
      </Fragment>      
    );
  }
}

export default App;
 