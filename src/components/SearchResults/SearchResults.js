import React from 'react';
import configureStore from '../../store/configureStore';

let state = configureStore.getState();
console.log('searchResults', state.heroData);
const numbers = [1,2,3,4];

const SearchResults = () => {
  for(let item in state.heroData){
    console.log(item)
  }  
  let listItems = numbers.map((number, index) => <li key={index}>{number}</li> );
  return (
    <div>
      {listItems}
    </div>
  )
}

export default SearchResults;