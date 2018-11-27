import React from 'react';
import { connect } from 'react-redux';

import '../../App.css';
import logo from '../../logo.svg';

const SearchResults = (props) => {
  let output = null;
  if (props.requestPending){
    output = (
      <img src={logo} alt='logo' className='App-logo' />
    )
  }
  if (props.requestSuccess) {
    output = Object.keys((props.heroData)).map((key) => {
      return <li key={key}>{props.heroData[key].name}</li>
    });
  }
  return (
    <div>
      <p>Search Results</p>
      {output}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    requestPending: state.heroes.requestPending,
    requestSuccess: state.heroes.requestSuccess,
    heroData: state.heroes.heroData,
  };
}
export default connect(mapStateToProps)(SearchResults);
