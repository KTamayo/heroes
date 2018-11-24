import { createStore, combineReducers } from 'redux';
import heroesReducer from './reducers/heroes';

const rootReducer = combineReducers({
  heroes: heroesReducer,
})

// const configureStore = () => {
//   return createStore(heroesReducer);
// }


export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);